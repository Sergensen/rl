import API from '../api';
import React, { Component } from 'react';
import local from '../local';
import SCHRÄG2 from '../res/rl-teaser.png';
import RLAPP from '../res/rl-app.png';
import RLINSTA from '../res/rl-insta.png';
import { Button, Card, Toast } from 'react-bootstrap';
import {
    isMobile
  } from "react-device-detect";

export default class MainPage extends Component {
    state = {
        local: {},
        height: 50,
        width: 50,
        ctnHeight: 100,
        show: false,
        time: Date.now()
    }

    componentDidMount(){
        API.getTop10().then(res => console.log(res));
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

        setTimeout(() => {
            this.setState({show: true})
        }, 3000);
    }

    onClick() {
        const { os } = this.state;
        window.open('https://play.google.com/store/apps/details?id=net.richlist');
    }

    render() {
        const {show, os} = this.state;
        return (
            <div style={styles.main}>
                {show && <Toast style={styles.toast} show={show} onClose={() => this.setState({show: false})}>
                    <Toast.Header>
                        <strong className="mr-auto">RichList</strong>
                        <small>2 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>RichList is currently the #1 trending app in the Play Store!</Toast.Body>
                </Toast>}
                <div style={styles.container}>
                    <Card style={styles.mobileCard}>
                        <Card.Img variant="top" src={SCHRÄG2} />
                        <Card.Body>
                            <Card.Title>Get on the list!</Card.Title>
                            <Card.Text style={{fontSize: 15}}>
                                Choose a username and upload a picture to become a RichList member!
                            </Card.Text>
                            <Button href="/pay" variant="primary">Checkout</Button>
                        </Card.Body>
                    </Card>
                    <Card style={isMobile ? styles.mobileCard : styles.card}>
                        <Card.Img variant="top" src={RLAPP} />
                        <Card.Body>
                            <Card.Title>Download the app!</Card.Title>
                            <Card.Text style={{fontSize: 15}}>
                                Download the app to check who is on the RichList!
                            </Card.Text>
                            <Button onClick={() => this.onClick()} variant="primary">Info</Button>
                        </Card.Body>
                    </Card>
                    <Card style={isMobile ? styles.mobileCard : styles.card}>
                        <Card.Img variant="top" src={RLINSTA} />
                        <Card.Body>
                            <Card.Title>Stay up to date!</Card.Title>
                            <Card.Text style={{fontSize: 15}}>
                                Follow us on Instagram!
                            </Card.Text>
                            <Button target="_blank" href="https://www.instagram.com/richlistapp/" variant="primary">Instagram</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

const styles = {
    card: { 
        minWidth: 300,
        width: "46%", 
        margin: "2%",
        borderColor: "darkgrey",
        backgroundColor: "black",
        color: "white"
     },
     mobileCard: {
        minWidth: 300,
        width: "96%", 
        margin: "2%",
        backgroundColor: "black",
        borderColor: "darkgrey",
        color: "white"
     },
    toast: {
        position: "fixed",
        top: 0,
        right: 0,
        height: 100
    },
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
    },
    imageContainerMain: {
        flex: 1
    },
    container: {
        flexWrap: "wrap",
        display: "flex",
        flex: 1,
        fontSize: "3vh",
        width: "100%",
        maxWidth: 900,
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: "10vh",
        marginTop: "2vh",
        paddingLeft: "1vw",
        paddingRight: "1vw",
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
    },
    textCtn: {
        height: "50%",
        display: "flex",
        justifyContent: "center"
    },
    buttonCtn: {
        height: "50%"
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
        justifyContent: "center",
        alignItems: "center"
    },
}