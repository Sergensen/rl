import axios from 'axios';
const API_URL = "https://us-central1-richlist-455b3.cloudfunctions.net/app/";
//const API_URL = "http://localhost:5001/";

export default {
    validatePayment(uniqueKey, amount, mail, message, tokenId, type) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + 'pay', { tokenId, type, mail, message, uniqueKey, amount, method: "stripe" })
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    },
    payStripe(uniqueKey, amount, uniqueName, mail, message) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + 'paystripe', { uniqueKey, amount, uniqueName, mail, message })
                .then(async res => {
                    /* global Stripe */
                    var stripe = Stripe('pk_test_281Xn05bEub9ENuPn0Y8EQaZ00cV8WCyfJ');
                    const {error} = await stripe.redirectToCheckout({
                        sessionId: res.data.id
                      });
                })
                .catch(err => reject(err));
        });
    },
    addUser(user) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + 'user', { ...user })
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    },
    putImage(image, url) {
        return new Promise(async (resolve, reject) => {
            if (image) {
                const response = await fetch(url, {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrer: 'no-referrer', // no-referrer, *client
                    body: image
                });
                resolve(response);
            } else {
                resolve();
            }
        });
    },
    nameExists(uniqueKey, uniqueName) {
        return new Promise(async (resolve, reject) => {
            axios.get(API_URL + 'userexists/' + (uniqueKey ? uniqueKey : "NO_KEY_EXISTING_1337") + '/' + uniqueName).then(result => {
                const { success, message } = result.data;
                success ? resolve(result.data) : reject(message);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        })
    },
    paypal( uniqueKey, amount, mail, uniqueName, message) {
        return new Promise(async (resolve, reject) => {
            axios.get(API_URL + 'webpaypal?uniqueKey=' + uniqueKey + '&amount=' + amount + "&mail=" + mail + "&uniqueName=" + encodeURI(uniqueName) + "&message="+message).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err);
            });
        });
    },
    API_URL: API_URL
}