import React, { Component } from 'react';
import { Link } from "react-router-dom";
import local from '../local';
import PLAYSTORE from '../res/playstore.png';
import APPSTORE from '../res/appstore.png';
import IPHONE from '../res/phone8.png';

export default class MainPage extends Component {
    state = {
        local: {}
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
    }

    onClick(os) {
        alert(os);
    }

    render() {
        const { os } = this.state;

        return (
            <div style={styles.main}>
                <div style={styles.container}>
                    <p style={styles.header}>Welcome to RichList!</p>
                        <p style={styles.text}>{"Make a payment "}
                        <a style={{...styles.text, ...{margin : 0}}} href="/pay">here</a>
                        {" to get on the RichList and download the app to see what's going on!"}</p>
                    <div style={styles.imageContainer}>
                        {os === "android" || os ==="all" && <img onClick={() => this.onClick("android")} style={styles.image} src={PLAYSTORE} />}
                        {os === "ios" || os ==="all" && <img onClick={() => this.onClick("ios")} style={styles.image} src={APPSTORE} />}
                    </div>
                    <img style={styles.phone} src={IPHONE} />
                </div>
            </div>
        );
    }
}


const styles = {
    main: {
        width: "100%",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center"
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
        flex: 1,
        marginTop: "5vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        flex: 1,
        textAlign: "center",
        color: "white"
    },
    text: {
        textAlign: "center",
        color: "white",
        margin: "0 5vw",
        overflowWrap: "break-word",
        wordWrap: "break-word",
    },
    image: {
        maxWidth: "40%",
        maxHeight: "40%",
    }, 
    phone: {
        marginBottom: "10vh",
        maxWidth: "100%",
    }
}