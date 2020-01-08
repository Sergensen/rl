import React, { Component } from 'react';
import API from '../api';
import PAYPAL from '../res/Paypal.png';
import STRIPE from '../res/Stripe.png';
import INFOICON from '../res/info-button.png';
import CameraIcon from '../res/camera.png';
import local from '../local';
import Modal from 'react-modal';
import StripeCheckout from 'react-stripe-checkout';
import { Spinner, Image, Popover, OverlayTrigger } from 'react-bootstrap';
import loadImage from 'blueimp-load-image';

Modal.setAppElement('#root')

class Checkout extends Component {
    state = {
        name: "",
        mail: "",
        uniqueKey: "",
        amount: "",
        message: "",
        instagram: "",
        cropped: false,
        twitter: "",
        tiktok: "",
        snapchat: "",
        image: null,
        checkBox: false,
        loading: false,
        method: "paypal",
        link: "https://www.richlist.net/terms",
        error: [true, true, true, true],
        local: {},
        paid: false,
        height: 1,
        width: 1,
    }

    componentDidMount(){
        const userLang = navigator.language || navigator.userLanguage; 
        this.setState({
            local: userLang==="de-DE" ? local.de : local.en,
        });
    }

    async paymentRequestWithPaypal() {
        let { uniqueKey, name, mail, message, amount } = this.state;
        try {
            const res = await API.nameExists(uniqueKey, name.trim());
            if(!uniqueKey) {
                this.setState({uniqueKey: res.uniqueKey});
                uniqueKey = res.uniqueKey;
            }
            if (!res.exists) {
                const result = await this.checkout();
                if (result) {
                    this.setState({paid: true});
                        const redirLink = await API.paypal(uniqueKey, amount, mail, name, message);
                    if((typeof redirLink === "object" || typeof redirLink === 'function') && (redirLink !== null)) {
                        this.setState({loading: true, paid: false, uniqueKey: ""});
                        alert("Something went wrong. Please try again.");
                    } else {
                        window.location.href = redirLink;
                    }
                } else {
                    this.setState({uniqueKey: ""});
                    alert("Something went wrong. Please try again.");
                }
            } else {
                this.setState({ error: [name, amount, mail, false], uniqueKey: "" });
                alert("Name is already in use. Please choose another name.");
            }
        } catch (error) {
            this.setState({uniqueKey: "", loading: false}, () => {
                alert(error);
            });
        }
    }

    async paymentRequestWithCardForm() {
        let { uniqueKey, name, mail, amount, message } = this.state;
        try {
            const res = await API.nameExists(uniqueKey, name.trim());
            if(!uniqueKey) {
                this.setState({uniqueKey: res.uniqueKey},);
                uniqueKey = res.uniqueKey;
            }
            if (!res.exists) {
                const result = await this.checkout();
                if (result) {
                    this.setState({loading: true, paid: true});
                    API.payStripe(uniqueKey, amount, name, mail, message);
                } else {
                    this.setState({uniqueKey: ""});
                    alert("Something went wrong. Please try again.");
                }
            } else {
                this.setState({ error: [name, amount, mail, false], uniqueKey: "" });
                alert("Name is already in use. Please choose another name.");
            }
        } catch (error) {
            this.setState({uniqueKey: "", loading: false}, () => {
                alert(error);
            });
        }
    }

    asyncSetState(object) {
        return new Promise((resolve, reject) => {
            this.setState(object, () => resolve());
        });
    }

    async onToken(token) {
        const result = await this.validateTransaction(token.id, "stripe");
        this.setState({loading: false});
        window.location = result.data.result.success ? "https://richlist.net/success" : "https://richlist.net/fail"; 
    }
    

    checkout() {
        return new Promise((resolve, reject) => {
            const { image, name, mail, instagram, twitter, snapchat, tiktok, message, loading, amount, method, uniqueKey } = this.state;
            this.setState({ loading: !loading });
                API.addUser({ uniqueKey , mail, uniqueName: name.trim(), amount, instagram, twitter, snapchat, tiktok, method, message: encodeURI(message.trim()), timestamp: Date.now() })
                    .then(async res => {
                        if(image && image.size <15000000) {
                            const resp = await API.putImage(image, res.data.result.uploadUrl);
                        } else if(image && image.size >=15000000) {
                            reject("The picture is too big!");
                        }
                        resolve(res);
                    })
                    .catch(e => reject(e));
                this.setState({ loading: !loading });
        });
    }

    selectPaymentMethod(e, method) {
        e.preventDefault();
        this.setState({ method });
    }

    pay() {
        const { method, name, mail, amount, error, checkBox, uniqueKey } = this.state;
        const validMail = this.validateEmail(mail);
        if (!checkBox) {
            alert("You have to accept our terms regarding to the withdrawal policy to proceed.");
        } else if(uniqueKey.toString().length!==0 && uniqueKey.toString().length !== 16) { 
            alert("Your payment key have to be empty or 16 characters long.");
        } else if (validMail && method === "paypal" && mail && name && amount) {
            this.setState({ error: [true, true, true, error[3]] });
          this.paymentRequestWithPaypal();
      } else if (validMail && method === "stripe" && name && mail && amount) {
          this.setState({ error: [true, true, true, error[3]] });
          this.paymentRequestWithCardForm();
      } else {
          if (validMail) {
              let alertString = "";
              if (!name) alertString = alertString + "Name, ";
              if (!amount) alertString = alertString + "Amount";
              if (alertString[alertString.length - 2] === ",") alertString = alertString.substring(0, alertString.length - 2);
              alert(alertString + ' required.');
          } else {
              alert("E-Mail is not valid!");
          }
          this.setState({ error: [name, amount, validMail, error[3]] });
      }
  }

    validateEmail(mail) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }

    validateTransaction(tokenId, type) {
        return new Promise((resolve, reject) => {
            const { amount, mail, message, uniqueKey } = this.state;
            API.validatePayment(uniqueKey, amount, mail, message, tokenId, type)
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }

    removeEmojis(string) {
      const regex = /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDF])\u200D[\u2640\u2642])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F?|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
      return string.replace(regex, '')
    }

    setAmount(e) {
        const reg = new RegExp('^[0-9]*$');
        let amount = "" + e.target.value;
        amount = amount.length>1 ? amount.substring(2) : amount;
        if (reg.test(amount)) this.setState({ amount: parseInt(amount, 10) });
    }

    async fileChangedHandler(e) {
        let image = e.target.files[0]
        if(image) {
            const img = await this.fixImage(image);
            this.setState({image: img});
        }
    }

    fixImage(image) {
        return new Promise((resolve, reject) => {
            loadImage.parseMetaData(image, function(data) {
                let orientation = 0;
                if (data.exif) orientation = data.exif.get('Orientation');
                loadImage(
                    image,
                    function(canvas) {
                        let base64data = canvas.toDataURL('image/jpeg');
                        let img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                        image.src = base64data;
                        resolve(image);
                    }, {
                        canvas: true,
                        orientation: orientation
                    }
                );
            });
        });
    }

    onLoad() {
        const { width, height } = this.img;
        if(width) {
            this.setState({
                width: width > height ? height: width,
                height: width > height ? height: width,
            })
        }
    }

    render() {
        const { height, width, paid, loading, name, amount, mail, message, instagram, twitter, tiktok, snapchat, method, checkBox, image, local, error, uniqueKey } = this.state;
        
        const popover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">{local.paymentKey}</Popover.Title>
              <Popover.Content>
                {local.paymentInfo}
              </Popover.Content>
            </Popover>
          );

          
        return (
        <div style={{...styles.flexContainerCol, ...styles.payContainer}}>
            {loading && 
                <div>
                    <div style={styles.loading} />
                    <Spinner style={styles.spinner} animation="border" />
                </div>}
            <div ref={ref => this.main = ref} style={styles.payMain}>
                    <div style={{ ...{marginBottom: 100}, ...styles.flexContainerCol}}>
                        {image && 
                                <button style={{...styles.imageButton, ...{height, width}}} onClick={() => this.imageInput.click()}>
                                    <input ref={ref => this.imageInput = ref} hidden accept="image/x-png,image/jpeg" style={styles.image} type="file" onChange={(e) => this.fileChangedHandler(e)} />
                                    <img onLoad={() => this.onLoad()} ref={ref => this.img = ref} id="img" alt="Image0" style={styles.image} src={image.src} />
                                </button>
                        } {!image && 
                            <button onClick={() => this.imageInput.click()} style={styles.imageContainer}>
                                <img style={styles.iconStyle} src={CameraIcon} alt="Icon" />
                                <input ref={ref => this.imageInput = ref} hidden accept="image/x-png,image/jpeg" style={styles.image} type="file" onChange={(e) => this.fileChangedHandler(e)} />
                            </button>
                        }
                        <div style={{...styles.flexOne}}>
                            <div className="info-button"></div>
                            <input value={name} onChange={e => /[\/%]/.test(e.target.value) ? {} : this.setState({ name: this.removeEmojis(e.target.value) })} style={{...styles.input, ...{border: !error[0] ? window.innerHeight*0.005+"px solid red": "1px solid lightgrey"}}} maxLength="20" type="text" placeholder={local.name}/>
                        </div>
                        <div style={{...styles.flexOne}}>
                            <input onChange={e => /[\/%]/.test(e.target.value) ? {} : this.setState({mail: e.target.value})} value={mail} style={{...styles.input, ...{border: !error[2] ? window.innerHeight*0.005+"px solid red": "1px solid lightgrey"}}} maxLength={35} type="text" placeholder={local.email}/>
                        </div>
                        <div style={{...styles.flexOne}}>
                            <input value={amount ? "$ " + amount : ""} onChange={e => this.setAmount(e)} style={{...styles.input, ...{border: !error[1] ? window.innerHeight*0.005+"px solid red": "1px solid lightgrey"}}} maxLength={8} type="text" placeholder={local.amount}/>
                        </div>
                        <div style={{...styles.flexOne}}>
                            <input value={message} onChange={e => /[\/%]/.test(e.target.value) ? {} : this.setState({ message: e.target.value })} style={styles.input} maxLength={35} type="text" placeholder={local.message}/>
                        </div>
                        <div style={{...styles.flexOne}}>
                            <input value={instagram} onChange={e =>/^$|[0-9A-Za-z_.]{1,15}/.test(e.target.value)&& !/[\/%]/.test(e.target.value) && this.setState({ instagram: e.target.value })} style={styles.input} maxLength={30} type="text" placeholder={local.instagram}/>
                        </div>
                        <div style={{...styles.flexOne}}>
                            <input value={tiktok} onChange={e =>/^$|[0-9A-Za-z_.]{1,15}/.test(e.target.value)&& !/[\/%]/.test(e.target.value) && this.setState({ tiktok: e.target.value })} style={styles.input} maxLength={30} type="text" placeholder={local.tiktok}/>
                        </div>
                        <div style={{...styles.flexOne}}>
                            <input value={snapchat} onChange={e => /^$|[0-9A-Za-z_.]{1,15}/.test(e.target.value)&& !/[\/%]/.test(e.target.value) && this.setState({ snapchat: e.target.value })} style={styles.input} maxLength={30} type="text" placeholder={local.snapchat}/>
                        </div>
                        <div style={{...styles.flexOne}}>
                            <input value={twitter} onChange={e => /^$|[0-9A-Za-z_.]{1,15}/.test(e.target.value)&& !/[\/%]/.test(e.target.value)  && this.setState({ twitter: e.target.value })} style={styles.input} maxLength={30} type="text" placeholder={local.twitter}/>
                        </div>
                        {!paid && <div style={{...styles.flexOne}}>
                            <OverlayTrigger placement="left" overlay={popover}>
                                <Image style={styles.infoIcon} src={INFOICON} roundedCircle />
                            </OverlayTrigger>
                            <input value={uniqueKey} onChange={e => /^[a-z0-9]*$/i.test(e.target.value) && this.setState({ uniqueKey: e.target.value })} style={styles.input} maxLength={16} type="text" placeholder={local.uniqueKey}/>
                        </div>}
                        <p style={styles.paymentlabel}>{local.method}</p>
                        <div style={{...styles.flexOne, ...styles.paymentMethods}}>
                            <button onClick={(e) => this.selectPaymentMethod(e, "paypal")} style={{...styles.methodButton, ...{marginRight: "0.5%", borderWidth: method==="paypal" ? window.innerHeight*0.0085: 1, borderColor: method==="paypal" ? "#443dff": "lightgrey"}}}>
                                <img alt="Logo1" src={PAYPAL} style={styles.payImg} />
                            </button>
                            <button onClick={(e) => this.selectPaymentMethod(e, "stripe")} style={{...styles.methodButton, ...{marginLeft: "0.5%", borderWidth: method==="stripe" ? window.innerHeight*0.0085 : 1, borderColor: method==="stripe" ? "#443dff": "lightgrey"}}}>
                                <img alt="Logo2" src={STRIPE} style={styles.payImg} />
                            </button>
                        </div>
                        <div style={styles.checkBoxContainer}>
                            <p style={styles.bottomText}>{local.tos1 + " "}
                            <a target="_blank" style={styles.bottomText} href={local.tosTermsLink}>{local.tos2 + " "}</a> 
                            {" " + local.tos3 + " "}
                            <a target="_blank" style={styles.bottomText} href={local.tosPrivacyLink}>{local.tos4 + " "}</a> 
                            {local.tos5}</p> 
                            <br />
                            <div onClick={() => this.setState(prev => ({checkBox: !prev.checkBox}))} style={{display: "flex"}}>
                                <input style={styles.checkBox} onChange={() => {}} checked={checkBox} type="checkbox" />
                                <p style={styles.bottomText}>{local.withdraw1}
                                </p> 
                            </div>
                        </div>


                        <div style={styles.flexOne}>
                            <button onClick={() => this.pay()} style={{...styles.submit, ...{backgroundColor: name && amount && mail && checkBox ? "blue":"grey"}}} maxLength={30}>{local.pay}</button>
                        </div> 
                        <script src="https://js.stripe.com/v3/"></script>

                        <div style={{display: "none"}}>
                            <StripeCheckout
                                token={this.onToken.bind(this)}
                                closed={() => this.setState({loading: false})}
                                name="RichList"
                                description="RichList secure payment"
                                stripeKey="pk_test_281Xn05bEub9ENuPn0Y8EQaZ00cV8WCyfJ"
                                amount={amount*100}
                                currency="USD"
                                allowRememberMe={false}
                                email={mail}>
                                <button ref={ref => this.stripeCheckout = ref} style={{...styles.submit, ...{backgroundColor: name && amount && mail && checkBox ? "blue":"grey"}}} maxLength={30}>{local.pay}</button>
                            </StripeCheckout>
                        </div>
                    </div>
            </div>
            
        </div>
  );
}
}

const styles = {
    paymentlabel: {
        margin: 16,
        color: "lightgrey"
    },
    checkBox: {
        width: window.innerHeight*0.1,
        height: window.innerHeight*0.1
    },
    infoIcon: {
        width: "6%",
        position: "absolute",
        right: "7.5%"
    },
    iconStyle: {
        width: window.innerHeight*0.05
    },
    spinner: {
        color: "white",
        left: "44vw",
        width: window.innerWidth*0.12,
        height: window.innerWidth*0.12,
        position: "fixed",
        top: "30%",
        textAlign: "center",
        zIndex: 1000
    },
    loading: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.75)"
    },
    image: {
        maxHeight: window.innerHeight*0.22,
        margin: 0
    },
    cropButton: {
        width: "50%",
        backgroundColor: "blue",
        color: "white",
        height: window.innerHeight*0.03,
        position: "absolute",
        zIndex: 1000,
        bottom: 0
    },
    bottomText: {
        display: "inline-block",
    },
    footer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        borderTop: "1px solid lightgrey",
        alignItems: "center",
        backgroundColor: "black",
        paddingTop: 10,
        paddingBottom: 10
    },
    links: {
        justifyContent: "space-around",
        display: "flex",
        flex: 1,
        height: "100%"
    },
    imageContainer: {
        margin: "10px 0",
        backgroundColor: "rgba(0, 0, 0, 0)",
        height: window.innerHeight*0.2,
        overflow: "hidden",
        width: window.innerHeight*0.2,
        border: "1px solid lightgrey",
        borderWidth: window.innerHeight*0.005,
        borderRadius: "50%"
    },
    link: {
        color: "lightgray",
        fontFamily: "sans-serif",
        textDecoration: "none",
        textAlign: "center",
        verticalAlign: "middle",
        padding: 10,
        flex: 1,
        fontSize: window.innerHeight*0.025,
        height: "100%"
    },
    payContainer:{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundRepeat: "repeat",
    }, 
    paymentMethods: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    methodButton: {
        textAlign: "center",
        width: "49.5%",
        height: window.innerHeight*0.1,
        backgroundColor: "black",
        border: "0px solid #443dff",
        boxSizing: "border-box",
        outline: 0,
    },
    payImg: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    flexContainerCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    payMain: {
        width: "100%",
        maxWidth: "900px",
    },
    checkBoxContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "black",
        color: "white",
        marginBottom: window.innerHeight*0.02,
        marginTop: window.innerHeight*0.02,
        fontSize: window.innerHeight*0.025,
    },
    imageButton: {
        backgroundColor:" rgba(0, 0, 0, 0)",
        overflow: "hidden",
        border: "4px solid lightgrey",
        borderRadius: "100%",
        padding: 0,
        margin: "10px 0",
        display: "flex",
        justifyContent: "center"
    },
    flexOne: {
        position: "relative",
        flex: 1,
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
    },
    paymentText: {
        color: "white",
        fontSize: window.innerHeight*0.03,
        
    },
    input: {
        textAlign: "center",
        width: "100%",
        height: window.innerHeight*0.06,
        fontSize: window.innerHeight*0.03,
        border: "1px solid lightgrey",
        color: "white",
        margin: "2% 0%",
        boxSizing: "border-box",
        backgroundColor: "black",
        WebkitInputPlaceholder: "lightgrey"
    },
    payMore: {
        color: "red"
    },
    submit: {
        textAlign: "center",
        width: "100%",
        height: window.innerHeight*0.05,
        fontSize: window.innerHeight*0.03,
        backgroundColor: "blue",
        color: "white",
        border: "0px solid white",
        boxSizing: "border-box"
    }
}
export default Checkout;
