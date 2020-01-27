import GLOBAL from './Globals'
import axios from 'axios';
import AnonymousImage from './res/images/profiles/ProfilePlaceholder.jpg'
import AnonymousImageVerification from './res/images/profiles/ProfilePlaceholder_inVerification.jpg'
const NodeRSA = require('node-rsa');
const { key } = require('./key.js');
const publicKey = new NodeRSA();
publicKey.importKey(key);

//const API_URL = "https://api.richlist.net/app/";
const API_URL = "http://localhost:5001/";

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


export default {
    getTop10() {
        return new Promise((resolve, reject) => {
            axios.get(API_URL + 'user/lastamount/-1', { timeout: 10000 }).then(async res => {
                await asyncForEach(res.data.output, async (user, i, users) => {
                    if (users[i].imgUrl === "" || !users[i].imgUrl) {
                        users[i].imgUrl = AnonymousImage
                    }

                    if (user.nsfw) users[i].imgUrl = AnonymousImageVerification;
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
                        imgUrl: AnonymousImage,
                        nsfw: false
                    }
                });
                resolve(res.data);
            }).catch(err => {
                reject(err)
            });
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
            axios.post(API_URL + 'webuser', { data: publicKey.encrypt({...user}) })
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
            axios.post(API_URL + 'webpaypal', {uniqueKey, amount, mail, uniqueName: encodeURI(uniqueName), message}).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err);
            });
        });
    },
    getProps(data) {
        return new Promise((resolve, reject) => {
            let params = [];
            data.forEach(user => params.push({ [user.uniqueName]: 0 }));
            axios.post(API_URL + 'webprops', { data: publicKey.encrypt({...params}) }, { timeout: 10000 }).then(res => {
                let props = {};
                res.data.props.forEach(user => props[Object.keys(user)[0]] = user[Object.keys(user)[0]]);
                for (let user of data) user.props = props[user.uniqueName];
                resolve(data);
            }).catch(err => reject(err));
        });
    },
    updateProps(props) {
        props = props.filter(prop => {
            return Object.keys(prop)[0] !== ""
        });
        return new Promise((resolve, reject) => {
            axios.post(API_URL + 'webprops', { data: publicKey.encrypt({...props}) }, { timeout: 10000 }).then(result => {
                resolve(result.data);
            }).catch(err => reject(err));
        });
    },
    fetchData(uniqueKey) {
        return new Promise((resolve, reject) => {
            axios.get(API_URL + 'user/' + uniqueKey, { timeout: 10000 }).then(result => {
                resolve(result.data);
            }).catch(err => reject(err));
        });
    },
    async getOnline() {
        const online = 210 + Math.floor(Math.random() * 10);
        return online
    },
    API_URL: API_URL
}