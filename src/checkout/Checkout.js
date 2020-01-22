import React, { Component } from 'react';
import local from '../local';
import Modal from 'react-modal';
import { Card, Button } from 'react-bootstrap';
import checkout1 from '../res/images/Checkout1Blur.jpg';
import checkout2 from '../res/images/Checkout2Blur.jpg';

import {
    isMobile
} from "react-device-detect";

Modal.setAppElement('#root')

class Checkout extends Component {
    state = {
        local: {},
        width: 256
    }

    componentDidMount(){
        const userLang = navigator.language || navigator.userLanguage; 
        this.setState({
            local: userLang==="de-DE" ? local.de : local.en,
        });
    }

    onLoad() {
        const width = this.image.clientWidth;
        this.setState({width});
    }

    render() {
        const { local, width } = this.state;
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <b>{local.makeAPayment1}</b>
                    <div style={{fontSize: isMobile ? window.innerHeight*0.025 : window.innerHeight*0.025}}>{local.makeAPayment3}</div>
                </div>
                <div style={styles.cardContainer}>
                    <div style={styles.card} onClick={() => window.location.href = "/pay/migos"}>
                        <div style={{height: width, width: width, ...styles.font}}><b>{local.firstTime}</b></div>
                        <img ref={ref => this.image = ref} onLoad={this.onLoad.bind(this)} style={styles.image} src={checkout2} />
                    </div>
                    <div style={styles.card} onClick={() => window.location.href = "/pay/billgates"}>
                        <div style={{height: width, width: width, ...styles.font}}><b>{local.nextTime}</b></div>
                        <img style={styles.image} src={checkout1} />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    cardContainer: {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        marginBottom: isMobile ? 0 : "20vh",
        maxWidth: 900
    },
    container:{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backgroundRepeat: "repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }, 
    card: {
        border: "1px solid grey",
        margin: isMobile ? window.innerWidth * 0.025 : window.innerWidth * 0.01,
        maxHeight: window.innerWidth
    },
    image: {
        maxHeight: window.innerWidth * 0.9
    },
    font: {
        color: "white",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        fontSize: isMobile ? window.innerHeight*0.04 : window.innerHeight*0.03,
        alignItems: "center"
    },
    header: {
        color: 'white',
        fontSize: isMobile ? window.innerHeight*0.04 : window.innerHeight*0.03,
        maxWidth: 900,
        width: '100%',
        margin: "1%",
        textAlign: 'center',
    },
}
export default Checkout;
