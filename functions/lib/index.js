"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const { Storage } = require('@google-cloud/storage');
const os_1 = require("os");
const path_1 = require("path");
const sharp = require("sharp");
const fileSystem = require("fs-extra");
const lodash_1 = require("lodash");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const gcs = new Storage();
// Creiamo un array di promises
const sizes = [64, 250];
const removeHtmlFrom = (s) => {
    let str = s;
    if ((str === null) || (str === ''))
        return false;
    return str.replace(/<[^>]*>/g, '');
};
exports.onSlotAdded = functions.database.ref('/Slots/{pushId}/')
    .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const newSlot = snapshot.val();
    const baseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/SlotImages%2F';
    const baseName = newSlot.image.split('&token')[0].split('%2F')[1].split('?')[0];
    const slotCard = {
        name: newSlot.name,
        image: `${baseImageUrl}thumb_${sizes[1]}_${baseName}?alt=media`,
        producer: newSlot.producer.name,
        rating: newSlot.rating,
        time: newSlot.time,
        type: newSlot.type,
        description: lodash_1.truncate(removeHtmlFrom(newSlot.description), { 'length': 150 })
    };
    const slotMenu = {
        name: newSlot.name,
        image: `${baseImageUrl}thumb_${sizes[0]}_${baseName}?alt=media`,
        description: `${lodash_1.truncate(removeHtmlFrom(newSlot.description), { 'length': 60 })}`
    };
    return snapshot.ref.parent.parent.child(`/SlotsCard/${context.params.pushId}`).set(slotCard).then(() => snapshot.ref.parent.parent.child(`/SlotsMenu/${context.params.pushId}`).set(slotMenu));
});
exports.generateThumbs = functions.storage.object().onFinalize((object) => __awaiter(this, void 0, void 0, function* () {
    const bucket = gcs.bucket(object.bucket);
    // dove si trova il file nello storage
    const filePath = object.name;
    // fa split rispetto a '/' e prende l'ultimo elemento dell'array
    const fileName = filePath.split('/').pop();
    // nome della cartella originale del file
    const bucketDir = path_1.dirname(filePath);
    // crea una directory temporanea dove conservare i file trasformati prima di riscriverli
    const temporaryDirectory = path_1.join(os_1.tmpdir(), 'thumbs');
    // crea un filePath temporaneo all'interno della directory temporanea
    const temporaryFilePath = path_1.join(temporaryDirectory, 'source.png');
    // break point per evitare che la funzione trigegri all'infinito
    // di base questa funzione va ogni volta che viene aggiunta un immagine
    // quindi riscrivendo nello storage l'immagine ridimensionata il loop sarebbe infito
    if (fileName.includes('thumb_') || !object.contentType.includes('image')) {
        return false;
    }
    // la creazione della directory temporanea può richeiedere tempo quindi
    // utilizziamo awai per aspettare che sia creata e inseriamo un callback
    yield fileSystem.ensureDir(temporaryDirectory);
    // scarichiamo il file nella directory (sempre in maniera asincrona)
    yield bucket.file(filePath).download({
        destination: temporaryFilePath
    });
    const uploadPromises = sizes.map((size) => __awaiter(this, void 0, void 0, function* () {
        const thumbName = `thumb_${size}_${fileName}`;
        const thumbPath = path_1.join(temporaryDirectory, thumbName);
        yield sharp(temporaryFilePath).resize(size, size).toFile(thumbPath);
        // upload della nuova immagine nello storage
        return bucket.upload(thumbPath, {
            destination: path_1.join(bucketDir, thumbName)
        });
    }));
    // chiamiamo tutte le promises nell'array
    yield Promise.all(uploadPromises);
    // rimuoviamo la directory temporanea con tutti i file che ormai sono stati uplodati
    return fileSystem.remove(temporaryDirectory);
}));
//# sourceMappingURL=index.js.map