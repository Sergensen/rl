import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Background from '../../res/images/Background_pattern.jpg';
import InstaBG from '../../res/images/profiles/InstaBackground.png';
import TwitterBg from '../../res/images/profiles/TwitterBackground.png';
import SnapchatBG from '../../res/images/profiles/SnapchatBackground.png';
import TikTokBG from '../../res/images/profiles/TikTokBackground.png';
import ProfileText from '../../res/images/profiles/ProfileText.png';
import {
    isMobile
} from "react-device-detect";


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class ModalContainer extends Component {
    state = {
        nameFontSize: '2.5vh',
        messageFontSize: '2vh',
        amountFontSize: '3vh',
        iconSize: '3.5vh'
    }

    setFontSize(event) {
        const { uniqueName, amount, message } = this.props.user;

        const width = event.currentTarget.offsetWidth;
        const height = event.currentTarget.offsetHeight * (isMobile ? 0.9 : 0.5);
        const nameFontSize = Math.sqrt(width * height / (uniqueName.length + 10)) * 0.2;
        const messageFontSize = message ? Math.sqrt(width * height / (message.length + 10)) * 0.2 : nameFontSize;
        const amountFontSize = Math.sqrt(width * height / (("" + amount).length + 10)) * 0.15;

        this.setState({
            nameFontSize,
            messageFontSize,
            amountFontSize,
            iconSize: height * (isMobile ? 0.05 : 0.065)
        })
    }

    render() {
        const { show, toggleModal, user } = this.props;
        let { uniqueName, instagram, message, tiktok, snapchat, twitter, imgUrl, imgBase64, amount, props } = this.props.user;

        uniqueName = uniqueName === "" ? "Anonymous" : uniqueName;
        props = !props ? 0 : props;
        message = !message || message === "undefined" ? null : message;

        const { nameFontSize, messageFontSize, amountFontSize, iconSize } = this.state;
        return (
            <Modal
                onHide={() => toggleModal()}
                onLoad={(e) => this.setFontSize(e)}
                show={show}
                scrollable={false}
                size="md"
                centered
                style={styles.backgroundCtn}
            >
                <div style={styles.background}>
                    <div style={{ ...styles.imageContainer }}>
                        <img src={imgBase64} style={styles.image} />
                    </div>
                    <div style={{ ...styles.textContainer, backgroundImage: `url(${ProfileText})` }}>
                        <img style={{ ...styles.iconLeft, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/ProfileIcon.png")} />
                        <img style={{ ...styles.iconRight, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/ProfileIcon.png")} />
                        <p style={{ ...styles.name, ...{ fontSize: nameFontSize } }}>{uniqueName}</p>
                        <p style={{ ...styles.amount, ...{ fontSize: amountFontSize } }}>{formatter.format(amount)}</p>
                    </div>

                    {props ? <div style={{ ...styles.infoContainer, backgroundImage: `url(${ProfileText})` }}>
                        <img style={{ ...styles.iconLeft, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/heart_red.png")} />
                        <img style={{ ...styles.iconRight, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/heart_red.png")} />
                        <p style={{ ...styles.name, ...{ fontSize: nameFontSize } }} >
                            {props}
                        </p>
                    </div> : <div></div>}

                    {message && <div style={{ ...styles.infoContainer, backgroundImage: `url(${ProfileText})` }}>
                        <img style={{ ...styles.iconLeft, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/messageIcon.png")} />
                        <img style={{ ...styles.iconRight, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/messageIcon.png")} />
                        <p style={{ ...styles.name, ...{ fontSize: messageFontSize } }}>
                            {message}
                        </p>
                    </div>}

                    {instagram ? <div style={{ ...styles.infoContainer, cursor: 'pointer', backgroundImage: `url(${InstaBG})` }}>
                        <a style={styles.infoContainer} onClick={() => window.open('https://www.instagram.com/' + instagram)}>
                            <img style={{ ...styles.iconLeft, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/instagram.png")} />
                            <img style={{ ...styles.iconRight, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/instagram.png")} />
                            <p style={{ ...styles.name, ...{ fontSize: nameFontSize, textDecorationLine: "underline" } }} >
                                @{instagram}
                            </p>
                        </a>
                    </div> : <div></div>}

                    {twitter ? <div style={{ ...styles.infoContainer, cursor: 'pointer', backgroundImage: `url(${TwitterBg})` }}>
                        <a style={styles.infoContainer} onClick={() => window.open('https://www.twitter.com/' + twitter)}>
                            <img style={{ ...styles.iconLeft, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/twitter.png")} />
                            <img style={{ ...styles.iconRight, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/twitter.png")} />
                            <p style={{ ...styles.name, ...{ fontSize: nameFontSize, textDecorationLine: "underline" } }} >
                                @{twitter}
                            </p>
                        </a>
                    </div> : <div></div>}

                    {tiktok ? <div style={{ ...styles.infoContainer, cursor: 'pointer', backgroundImage: `url(${TikTokBG})` }}>
                        <a style={styles.infoContainer} onClick={() => window.open('https://www.tiktok.com/@' + tiktok)}>
                            <img style={{ ...styles.iconLeft, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/TikTok.png")} />
                            <img style={{ ...styles.iconRight, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/TikTok.png")} />
                            <p style={{ ...styles.name, ...{ fontSize: nameFontSize, textDecorationLine: "underline" } }} >
                                @{tiktok}
                            </p>
                        </a>
                    </div> : <div></div>}

                    {snapchat ? <div style={{ ...styles.infoContainer, cursor: 'pointer', ...{ backgroundImage: `url(${SnapchatBG})` } }}>
                        <a style={styles.infoContainer} onClick={() => window.open('https://www.snapchat.com/add/' + snapchat)}>
                            <img style={{ ...styles.iconLeft, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/snapchat.png")} />
                            <img style={{ ...styles.iconRight, ...{ width: iconSize, height: iconSize } }} src={require("../../res/images/profiles/snapchat.png")} />
                            <p style={{ ...styles.name, ...{ fontSize: nameFontSize, textDecorationLine: "underline" } }} >
                                @{snapchat}
                            </p>
                        </a>
                    </div> : <div></div>}

                    <div style={{ ...styles.infoContainer, cursor: 'pointer', backgroundImage: `url(${ProfileText})` }}>
                        <a style={{ ...styles.infoContainer, ...styles.back }} onClick={() => toggleModal()}>
                            <p style={{ ...styles.name, ...{ fontSize: nameFontSize } }} >Close</p>
                        </a>
                    </div>
                </div>
            </Modal>
        );
    }
}

const styles = {
    backgroundCtn: {
        marinTop: '2vh'
    },
    background: {
        alignItems: "center",
        backgroundImage: `url(${Background})`,
        backgroundSize: 100,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        overflow: "hidden",
        borderRadius: 2000,
        height: '20vh',
        width: '20vh',
    },
    image: {
        width: '100%'
    },
    unblockBtn: {
        position: "absolute",
        zIndex: 1000,
        paddingLeft: 5,
        paddingRight: 5,
        right: 5,
        top: 5,
        height: "3.5vh",
        backgroundColor: "rgba(110, 255, 110, 0.65)",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    reportBtn: {
        position: "absolute",
        zIndex: 1000,
        paddingLeft: 5,
        paddingRight: 5,
        right: 5,
        top: 5,
        height: "3.5vh",
        backgroundColor: "rgba(255, 110, 110, 0.65)",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    textContainer: {
        width: "100%",
        height: isMobile ? "9vh" : "7.5vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 3,
    },
    infoContainer: {
        width: "100%",
        height: isMobile ? "6.5vh" : "5vh",
        justifyContent: "center",
        display: 'flex',
        alignItems: "center",
        backgroundSize: 'cover',
        margin: 3,
    },
    iconLeft: {
        position: "absolute",
        left: 40,
        //flex: 1,
        //marginHorizontal: 20,
    },
    iconRight: {
        position: "absolute",
        right: 40,
    },
    name: {
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "Calisto MT",
        color: "#ffffff",
        textShadow: "1px 1px 3px #000000",
        fontWeight: 'bold',


    },
    amount: {
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "Cash Currency",
        //color: "#85bb65",
        //color: "#d7d9cb",
        color: "#a2ce8f",
        textShadow: "1px 1px 3px #000000",
        letterSpacing: 1,
    },

    back: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
};