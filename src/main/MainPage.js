import React, { Component } from 'react';
import { Link } from "react-router-dom";
import local from '../local';
import PLAYSTORE from '../res/playstore.png';
import APPSTORE from '../res/appstore.png';
import IPHONE from '../res/phone8.png';
import PAYPAL from '../res/Paypal.png';
import STRIPE from '../res/Stripe.png';

import BackgroundButton from '../res/InfoBackground.png';
import BackgroundText from '../res/Platz4-6_Border.png';

export default class MainPage extends Component {
    state = {
        local: {},
        height: 50,
        width: 50,
        ctnHeight: 100,
        time: Date.now()
    }

    componentDidMount(){
        const userLang = navigator.language || navigator.userLanguage; 
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        let os = "all";

         if (/android/i.test(userAgent)) {
            os = "android";
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            os = "ios";
        }
  
        this.setState({
            local: userLang==="de-DE" ? local.de : local.en,
            os
        });
        
        window.addEventListener('resize', this.resizeHandler.bind(this));
    }

    resizeHandler() {
        const { time } = this.state;
        if(time < Date.now()-100) {
            this.setState({
                time,
                width: this.width.width,
                ctnHeight: this.width.height,
                height: this.height.height
            });
        }
    }

    onClick() {
        const { os } = this.state;
        alert(os);
    }

    setHeight(e) {
        this.setState({height: e.target.height});
    }

    setWidth(e) {
        this.setState({
            width: e.target.width,
            ctnHeight: e.target.height
        });
    }

    render() {
        const { os, height, width,ctnHeight } = this.state;
        return (
            <div style={styles.main}>
                <div style={styles.container}>
                    <div id="hoverImg"  onClick={() => window.location="/pay"} style={styles.textBGCTN}>
                        <img ref={ref => this.width = ref}  onLoad={(e) => this.setWidth(e)} style={styles.textBG} src={BackgroundButton} />
                        <div style={{height: ctnHeight,...styles.insidePay}}>
                            <div style={{marginTop: ctnHeight/9, ...styles.textCtn}}>
                                <img style={styles.textImage} src={BackgroundText} />
                                <a style={{marginTop: ctnHeight/12 , ...styles.text}} href="/pay">GET ON THE LIST</a>
                            </div>
                            <div style={styles.paymentmethods}>
                                <div />
                                <div />
                                <img alt="Logo1" src={PAYPAL} style={{width: width/4, ...styles.payImg}} />
                                <img alt="Logo2" src={STRIPE}  style={{width: width/4, ...styles.payImg}} />
                                <div />
                                <div />
                            </div>
                        </div>
                    </div>
                    <div style={styles.imageContainerMain}>
                        <div style={{...styles.imageContainer, marginTop: height/3}}>
                            <img onClick={() => this.onClick()} style={styles.image} src={PLAYSTORE} />
                            <br />
                            <img onClick={() => this.onClick()} style={styles.image} src={APPSTORE} />
                        </div>
                        <img ref={ref => this.height = ref} onLoad={(e) => this.setHeight(e)} style={styles.phone} src={IPHONE} />
                    </div>
                </div>
            </div>
        );
    }
}


const styles = {
    textImage: {
        height: "40%",
        position: "absolute",
        opacity: 0.5
    },
    main: {
        width: "100%",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        minHeight: "100vh"

    },
    imageContainerMain: {
        flex: 1
    },
    container: {
        display: "flex",
        flex: 1,
        fontSize: "3vh",
        width: "100%",
        maxWidth: 900,
        justifyContent: "center",
        flexDirection: "column",
    },
    imageContainer: {
        maxWidth: 900,
        position: "absolute",
        flex: 1,
        marginTop: "5vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    textBGCTN: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    textBG: {
        width: "100%",
        height: "80%",
        marginTop: "2vh"
    },
    textCtn: {
        height: "50%",
        display: "flex",
        justifyContent: "center"
    },
    text: {
        textDecoration: "none",
        color: "white",
        zIndex: 10000,
        top: 10
    },
    image: {
        maxWidth: "30%",
        maxHeight: "30%",
    }, 
    phone: {
        marginBottom: "10vh",
        maxWidth: "100%",
    },
    paymentmethods: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row"
    },
    insidePay: {
        width: "100%",
        maxWidth: 900,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
    },
}