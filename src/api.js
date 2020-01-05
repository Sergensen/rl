import GLOBAL from './Globals'
import axios from 'axios';

const API_URL = "https://us-central1-richlist-455b3.cloudfunctions.net/app/";
//const API_URL = "http://localhost:5001/";

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

export default {
    getTop10() {
        return new Promise((resolve, reject) => {
            axios.get(API_URL + 'user/lastamount/-1', { timeout: 10000 }).then(async res => {
                await asyncForEach(res.data, async (user, i, users) => {
                    if (users[i].imgUrl === "" || !users[i].imgUrl) {
                        users[i].imgUrl = GLOBAL.PROFILE_PLACEHOLDER
                    }

                    if (user.nsfw) users[i].imgUrl = GLOBAL.PROFILE_PLACEHOLDER_TO_VERIFY;
                    if (user.banned) users[i] = {
                        ...user,
                        uniqueName: "Banned user",
                        unblock: user.uniqueName,
                        props: 0,
                        instagram: "",
                        message: "",
                        twitter: "",
                        snapchat: "",
                        tiktok: "",
                        imgUrl: GLOBAL.PROFILE_PLACEHOLDER,
                        nsfw: false
                    }
                });
                resolve(res.data);
            })
                .catch(err => {
                    reject(err)
                });
        });
    },
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
                    var stripe = Stripe('pk_live_tkMZOGMXAbfPMMZNBGICo7sW00nYaxrMmy');
                    const { error } = await stripe.redirectToCheckout({
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
    paypal(uniqueKey, amount, mail, uniqueName, message) {
        return new Promise(async (resolve, reject) => {
            axios.get(API_URL + 'webpaypal?uniqueKey=' + uniqueKey + '&amount=' + amount + "&mail=" + mail + "&uniqueName=" + encodeURI(uniqueName) + "&message=" + message).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err);
            });
        });
    },
    API_URL: API_URL
}