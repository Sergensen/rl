import axios from 'axios';

const API_URL = "https://us-central1-richlist-455b3.cloudfunctions.net/app/";

function validatePayment(uniqueKey, amount, mail, message, tokenId, type) {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + 'pay', { tokenId, type, mail, message, uniqueKey, amount, method: "stripe" }, {timeout: 5500})
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}

function addUser(user) {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + 'user', { ...user }, {timeout: 5500})
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}

function putImage(image, url) {
    return new Promise((resolve, reject) => {
        if (image) {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.onload = () => {
                const status = xhr.status;
                if (status === 200) {
                    resolve()
                } else {
                    reject()
                }
            };

            xhr.onerror = () => {
                reject()
            };
            xhr.setRequestHeader('Content-Type', image.type);
            xhr.send(image);
        } else {
            resolve();
        }
    });
};

function nameExists(uniqueKey, uniqueName) {
    return new Promise(async (resolve, reject) => {
        axios.get(API_URL + 'userexists/' + uniqueKey + '/' + uniqueName, {timeout: 5500}).then(result => {
            const { success, exists, message } = result.data;
            success ? resolve(exists === true) : reject(message);
        }).catch(err => {
            reject(err);
        });
    });
}

export default {
    nameExists,
    addUser,
    putImage,
    validatePayment,
    API_URL,
}