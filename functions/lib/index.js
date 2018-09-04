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
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const gcs = new Storage();
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
    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
        return false;
    }
    // la creazione della directory temporanea può richeiedere tempo quindi
    // utilizziamo awai per aspettare che sia creata e inseriamo un callback
    yield fileSystem.ensureDir(temporaryDirectory);
    // scarichiamo il file nella directory (sempre in maniera asincrona)
    yield bucket.file(filePath).download({
        destination: temporaryFilePath
    });
    // Creiamo un array di promises
    const sizes = [64, 128, 256];
    const uploadPromises = sizes.map((size) => __awaiter(this, void 0, void 0, function* () {
        const thumbName = `thumb@${size}_${fileName}`;
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