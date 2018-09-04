import * as functions from 'firebase-functions';
const { Storage } = require('@google-cloud/storage');
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import * as sharp from 'sharp';
import * as fileSystem from 'fs-extra';
import { fstat } from 'fs';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const gcs = new Storage();

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
    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
        return false;
    }

    // la creazione della directory temporanea può richeiedere tempo quindi
    // utilizziamo awai per aspettare che sia creata e inseriamo un callback
    await fileSystem.ensureDir(temporaryDirectory);

    // scarichiamo il file nella directory (sempre in maniera asincrona)
    await bucket.file(filePath).download({
        destination: temporaryFilePath
    });

    // Creiamo un array di promises
    const sizes = [64, 250];
    const uploadPromises = sizes.map(async size => {
        const thumbName = `thumb@${size}_${fileName}`;
        const thumbPath = join(temporaryDirectory, thumbName);

        await sharp(temporaryFilePath).resize(size, size).toFile(thumbPath);

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
