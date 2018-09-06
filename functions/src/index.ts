import * as functions from 'firebase-functions';
const { Storage } = require('@google-cloud/storage');
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import * as sharp from 'sharp';
import * as fileSystem from 'fs-extra';
import { fstat } from 'fs';
import { truncate, snakeCase } from 'lodash';
import { database } from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp();
const gcs = new Storage();
// Creiamo un array di promises
const sizes = [64, 250];
const removeHtmlFrom = (s) => {
    let str = s
    if ((str === null) || (str === ''))
        return false;

    return str.replace(/<[^>]*>/g, '');
}

export const onSlotAdded = functions.database.ref('/Slots/{language}/{pushId}/')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const newSlot = snapshot.val();
        const baseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/SlotImages%2F';
        const baseName = newSlot.imageName
        const slotCard = {
            name: newSlot.name,
            image: `${baseImageUrl}thumb_${sizes[1]}_${baseName}?alt=media`,
            producer: newSlot.producer.name,
            rating: newSlot.rating,
            time: newSlot.time,
            type: newSlot.type,
            description: truncate(removeHtmlFrom(newSlot.description), { 'length': 150 })
        }

        const slotMenu = {
            name: newSlot.name,
            image: `${baseImageUrl}thumb_${sizes[0]}_${baseName}?alt=media`,
            description: `${truncate(removeHtmlFrom(newSlot.description), { 'length': 60 })}`
        }

        return snapshot.ref.parent.parent.parent.child(`/SlotsCard/${context.params.language}/${context.params.pushId}`).set(slotCard).then(() =>
            snapshot.ref.parent.parent.parent.child(`/SlotsMenu/${context.params.language}/${context.params.pushId}`).set(slotMenu)
        )
    });

export const onSlotDeleted = functions.database.ref('/Slots/{language}/{slotId}/')
    .onDelete((snapshot, context) => {
        const slotId = context.params.slotId;
        const language = context.params.language
        const imageName = snapshot.val().image.split('?alt')[0].split('/SlotImages%2F').pop()
        console.log('image name', imageName);

        return admin.database.ref.child(`/SlotsCard/${language}/${slotId}`).remove()
            .then(() => {
                console.log('should remove path:');

                admin.storage.ref(`/SlotImages/${imageName}`).remove()
            })

    })

export const generateThumbs = functions.storage.object().onFinalize(async object => {
    const bucket = gcs.bucket(object.bucket)
    // dove si trova il file nello storage
    const filePath = object.name;
    // fa split rispetto a '/' e prende l'ultimo elemento dell'array
    const fileName = filePath.split('/').pop();
    // nome della cartella originale del file
    const bucketDir = dirname(filePath);

    // crea una directory temporanea dove conservare i file trasformati prima di riscriverli
    const temporaryDirectory = join(tmpdir(), 'thumbs');
    // crea un filePath temporaneo all'interno della directory temporanea
    const temporaryFilePath = join(temporaryDirectory, 'source.png');


    // break point per evitare che la funzione trigegri all'infinito
    // di base questa funzione va ogni volta che viene aggiunta un immagine
    // quindi riscrivendo nello storage l'immagine ridimensionata il loop sarebbe infito
    if (fileName.includes('thumb_') || !object.contentType.includes('image')) {
        return false;
    }

    // la creazione della directory temporanea può richeiedere tempo quindi
    // utilizziamo awai per aspettare che sia creata e inseriamo un callback
    await fileSystem.ensureDir(temporaryDirectory);

    // scarichiamo il file nella directory (sempre in maniera asincrona)
    await bucket.file(filePath).download({
        destination: temporaryFilePath
    });


    const uploadPromises = sizes.map(async size => {
        const thumbName = `thumb_${size}_${fileName}`;
        const thumbPath = join(temporaryDirectory, thumbName);

        await sharp(temporaryFilePath).resize(size, Math.floor((size * 9) / 16)).toFile(thumbPath);

        // upload della nuova immagine nello storage
        return bucket.upload(thumbPath, {
            destination: join(bucketDir, thumbName)
        })

    });

    // chiamiamo tutte le promises nell'array
    await Promise.all(uploadPromises);

    // rimuoviamo la directory temporanea con tutti i file che ormai sono stati uplodati
    return fileSystem.remove(temporaryDirectory);
})
