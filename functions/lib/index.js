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
// costanti necessarie
const admin = require('firebase-admin');
const mkdirp = require('mkdirp-promise');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const rp = require('request-promise');
const crypto = require('crypto');
const secureCompare = require('secure-compare');
admin.initializeApp();
const gcs = new Storage();
const slotSizes = [64, 250];
const producerSizes = [64];
const removeHtmlFrom = (s) => {
    let str = s;
    if ((str === null) || (str === ''))
        return false;
    return str.replace(/<[^>]*>/g, '');
};
// -------------------DATABASE TRIGGERS--------------------------------------------------------------
exports.onSlotAdded = functions.database.ref('/Slots/{language}/{pushId}/')
    .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const newSlot = snapshot.val();
    const slotCard = {
        name: newSlot.name,
        producer: newSlot.producer.name,
        rating: newSlot.rating,
        time: newSlot.time,
        type: newSlot.type,
        description: lodash_1.truncate(removeHtmlFrom(newSlot.description), { 'length': 150 })
    };
    const slotMenu = {
        name: newSlot.name,
        description: `${lodash_1.truncate(removeHtmlFrom(newSlot.description), { 'length': 60 })}`
    };
    return admin.database().ref(`/SlotsCard/${context.params.language}/${context.params.pushId}`).set(slotCard)
        .then(() => admin.database().ref(`/SlotsMenu/${context.params.language}/${context.params.pushId}`).set(slotMenu));
});
exports.onSlotUpdated = functions.database.ref('/Slots/{language}/{editedId}/')
    .onUpdate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const newSlot = snapshot.after.val();
    const baseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/SlotImages%2F';
    const baseName = newSlot.imageName;
    const slotCard = {
        name: newSlot.name,
        image: `${baseImageUrl}thumb_${slotSizes[1]}_${baseName}?alt=media`,
        producer: newSlot.producer.name,
        rating: newSlot.rating,
        time: newSlot.time,
        type: newSlot.type,
        description: lodash_1.truncate(removeHtmlFrom(newSlot.description), { 'length': 150 })
    };
    const slotMenu = {
        name: newSlot.name,
        image: `${baseImageUrl}thumb_${slotSizes[0]}_${baseName}?alt=media`,
        description: `${lodash_1.truncate(removeHtmlFrom(newSlot.description), { 'length': 60 })}`
    };
    return admin.database().ref(`/SlotsCard/${context.params.language}/${context.params.editedId}`).set(slotCard).then(() => admin.database().ref(`/SlotsMenu/${context.params.language}/${context.params.editedId}`).set(slotMenu));
});
exports.onSlotDeleted = functions.database.ref('/Slots/{language}/{slotId}/')
    .onDelete((snapshot, context) => {
    const slotId = context.params.slotId;
    const language = context.params.language;
    const imageName = snapshot.val().image.split('?alt')[0].split('/SlotImages%2F').pop();
    console.log('image name', imageName);
    return admin.database().ref.child(`/SlotsCard/${language}/${slotId}`).remove()
        .then(() => {
        console.log('should remove path:');
        admin.storage().ref(`/SlotImages/${imageName}`).remove();
    });
});
// -----------------------STORAGE TRIGGERS------------------------------------------------------------
exports.generateThumbs = functions.storage.object().onFinalize((object) => __awaiter(this, void 0, void 0, function* () {
    const bucket = gcs.bucket(object.bucket);
    // dove si trova il file nello storage
    const filePath = object.name;
    // fa split rispetto a '/' e prende l'ultimo elemento dell'array
    const fileName = filePath.split('/').pop();
    // nome della cartella originale del file
    const bucketDir = path_1.dirname(filePath);
    // crea una directory temporanea dove conservare i file trasformati prima di riscriverli
    const temporaryDirectory = path_1.join(os_1.tmpdir(), `thumbs_${fileName}`);
    // crea un filePath temporaneo all'interno della directory temporanea
    const temporaryFilePath = path_1.join(temporaryDirectory, 'source.png');
    // break point per evitare che la funzione trigegri all'infinito
    // di base questa funzione va ogni volta che viene aggiunta un immagine
    // quindi riscrivendo nello storage l'immagine ridimensionata il loop sarebbe infito
    if (fileName.includes('thumb_') ||
        fileName.includes('bonus') ||
        !object.contentType.includes('image')) {
        return false;
    }
    // la creazione della directory temporanea può richeiedere tempo quindi
    // utilizziamo awai per aspettare che sia creata e inseriamo un callback
    yield fileSystem.ensureDir(temporaryDirectory);
    // scarichiamo il file nella directory (sempre in maniera asincrona)
    yield bucket.file(filePath).download({
        destination: temporaryFilePath
    });
    // se l'immagine che triggera è di una slot servono 2 thumbnail
    if (fileName.includes('slot')) {
        const slotUploadPromises = slotSizes.map((size) => __awaiter(this, void 0, void 0, function* () {
            const thumbName = `thumb_${size}_${fileName}`;
            const thumbPath = path_1.join(temporaryDirectory, thumbName);
            yield sharp(temporaryFilePath).resize(size, Math.floor((size * 9) / 16)).toFile(thumbPath);
            // upload della nuova immagine nello storage
            return bucket.upload(thumbPath, {
                destination: path_1.join(bucketDir, thumbName),
                metadata: {
                    contentType: 'image/jpeg',
                }
            });
        }));
        // chiamiamo tutte le promises nell'array
        yield Promise.all(slotUploadPromises);
    }
    // se l'immagine che triggera è di un bonus serve solo 1 thumbnail piccolo per il menu
    if (fileName.includes('producer')) {
        const producerUploadPromises = producerSizes.map((size) => __awaiter(this, void 0, void 0, function* () {
            const thumbName = `thumb_${size}_${fileName}`;
            const thumbPath = path_1.join(temporaryDirectory, thumbName);
            yield sharp(temporaryFilePath).resize(size, Math.floor((size * 9) / 16)).toFile(thumbPath);
            // upload della nuova immagine nello storage
            return bucket.upload(thumbPath, {
                destination: path_1.join(bucketDir, thumbName),
                metadata: {
                    contentType: 'image/jpeg',
                }
            });
        }));
        // chiamiamo tutte le promises nell'array
        yield Promise.all(producerUploadPromises);
    }
    // rimuoviamo la directory temporanea con tutti i file che ormai sono stati uplodati
    return fileSystem.remove(temporaryDirectory);
}));
exports.imageToJPG = functions.storage.object().onFinalize((object) => __awaiter(this, void 0, void 0, function* () {
    const filePath = object.name;
    const baseFileName = path.basename(filePath, path.extname(filePath));
    const fileDir = path.dirname(filePath);
    const JPEGFilePath = path.normalize(path.format({ dir: fileDir, name: baseFileName }));
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);
    // Non deve andare se non è un immagine
    if (!object.contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return null;
    }
    // Non deve andare se è già jpeg
    if (object.contentType.startsWith('image/jpeg')) {
        console.log('Already a JPEG.');
        return null;
    }
    const bucket = admin.storage().bucket(object.bucket);
    // directory temporanea
    yield mkdirp(tempLocalDir);
    // Download
    yield bucket.file(filePath).download({ destination: tempLocalFile });
    console.log('The file has been downloaded to', tempLocalFile);
    // conversione in jpeg
    yield spawn('convert', [tempLocalFile, tempLocalJPEGFile]);
    console.log('JPEG image created at', tempLocalJPEGFile);
    // upload
    yield bucket.upload(tempLocalJPEGFile, { destination: JPEGFilePath });
    console.log('JPEG image uploaded to Storage at', JPEGFilePath);
    // rimozione file temporanei
    fs.unlinkSync(tempLocalJPEGFile);
    fs.unlinkSync(tempLocalFile);
    // rimozione file NON Jpeg
    bucket.file(filePath).delete();
    // rimozione cartella temporanea
    return fileSystem.remove(tempLocalDir);
}));
/**
 * Webhook that will be called each time there is a new GitHub commit and will post a message to
 * Slack.
 */
// http generato durante il deploy per chiamare la funzione in remoto
// non disponibile con il piano free :/
/* exports.githubWebhook = functions.https.onRequest(async (req, res) => {
    const cipher = 'sha1';
    const signature = req.headers['x-hub-signature'];
    console.log('req', req)
    console.log('body', req.body);
    if (req.body) {
        // TODO: Configure the `github.secret` Google Cloud environment variables.
        const hmac = crypto.createHmac(cipher, functions.config().github.secret)
            .update(req.body)
            .digest('hex');
        const expectedSignature = `${cipher}=${hmac}`;
        console.log('expected', expectedSignature);
        console.log('hmac', hmac);

        // Check that the body of the request has been signed with the GitHub Secret.
        if (!secureCompare(signature, expectedSignature)) {
            console.error('x-hub-signature', signature, 'did not match', expectedSignature);
            return res.status(403).send('Your x-hub-signature\'s bad and you should feel bad!');
        }

        try {
            await postToSlack(req.body.compare, req.body.commits.length, req.body.repository);
            return null;
        } catch (error) {
            console.error(error);
            return res.status(500).send('Something went wrong while posting the message to Slack.');
        }
    } else {
        console.log('req', req)

        return null
    }
});


function postToSlack(url, commits, repo) {
    return rp({
        method: 'POST',
        // TODO: Configure the `slack.webhook_url` Google Cloud environment variables.
        uri: functions.config().slack.webhook_url,
        body: {
            text: `<${url}|${commits} new commit${commits > 1 ? 's' : ''}> pushed to <${repo.url}|${repo.full_name}>.`,
        },
        json: true,
    });
}
 */ 
//# sourceMappingURL=index.js.map