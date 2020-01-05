import React, { Component } from 'react';
import { Button, Card, Toast, Modal } from 'react-bootstrap';

export default class ModalContainer extends Component {
    state = {
        nameFontSize: 17,
        messageFontSize: 21,
        amountFontSize: 21,
        imageSize: "40vw",
        iconSize: 30,
    }

    render() {
        if(this.props.user) {
            let { uniqueName, instagram, message, tiktok, snapchat, twitter, imgUrl, amount, props } = this.props.user;

            uniqueName = uniqueName === "" ? "Anonymous" : uniqueName;
            props = !props ? 0 : props;
            message = !message || message === "undefined" ? null : message;
    
            const { nameFontSize, messageFontSize, amountFontSize, imageSize, iconSize } = this.state;
            return (
                <div source={require("../../res/images/profiles/ModalBackground.png")} style={styles.background}>
                    <div style={[styles.imageContainer, { width: imageSize, height: imageSize }]}>
                    <img source={{ uri: imgUrl }}
                    style={styles.image} />
                    </div>
                    <div source={require("../../res/images/profiles/ProfileText.png")} style={styles.textContainer}>
                        <img style={[styles.iconLeft, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/ProfileIcon.png")} />
                        <img style={[styles.iconRight, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/ProfileIcon.png")} />
                        <p style={[styles.name, { fontSize: nameFontSize * 1.2, lineHeight: nameFontSize * 1.4, }]} > {uniqueName} </p>
                        <input
                            value={amount}
                            currency="USD"
                            style={[styles.amount, { fontSize: amountFontSize, lineHeight: amountFontSize * 1.5 }]} />
                    </div>
    
                    {props ? <div source={require("../../res/images/profiles/ProfileText.png")} style={styles.infoContainer}>
                        <img style={[styles.iconLeft, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/heart_red.png")} />
                        <img style={[styles.iconRight, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/heart_red.png")} />
                        <p style={[styles.name, { fontSize: nameFontSize, lineHeight: nameFontSize * 1.2 }]} >
                            {props}
                        </p>
                    </div> : <div></div>}
    
                    {message && <div source={require("../../res/images/profiles/ProfileText.png")} style={styles.infoContainer}>
                        <p style={[styles.name, { fontSize: messageFontSize, lineHeight: nameFontSize * 1.5 }]}>
                            {message}
                        </p>
                    </div>}
    
                    {instagram ? <div source={require("../../res/images/profiles/InstaBackground.png")} style={styles.infoContainer}>
                        <a style={styles.infoContainer} onPress={() => this.openInstagram()}>
                            <img style={[styles.iconLeft, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/instagram.png")} />
                            <img style={[styles.iconRight, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/instagram.png")} />
                            <p style={[styles.name, { fontSize: nameFontSize, lineHeight: nameFontSize * 1.2, textDecorationLine: "underline" }]} >
                                @{instagram}
                            </p>
                        </a>
                    </div> : <div></div>}
    
                    {twitter ? <div source={require("../../res/images/profiles/TwitterBackground.png")} style={styles.infoContainer}>
                        <a style={styles.infoContainer} onPress={() => this.openTwitter()}>
                            <img style={[styles.iconLeft, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/twitter.png")} />
                            <img style={[styles.iconRight, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/twitter.png")} />
                            <p style={[styles.name, { fontSize: nameFontSize, lineHeight: nameFontSize * 1.2, textDecorationLine: "underline" }]} >
                                @{twitter}
                            </p>
                        </a>
                    </div> : <div></div>}
    
                    {snapchat ? <div source={require("../../res/images/profiles/SnapchatBackground.png")} style={styles.infoContainer}>
                        <a style={styles.infoContainer} onPress={() => this.openSnapchat()}>
                            <img style={[styles.iconLeft, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/snapchat.png")} />
                            <img style={[styles.iconRight, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/snapchat.png")} />
                            <p style={[styles.name, { fontSize: nameFontSize, lineHeight: nameFontSize * 1.2, textDecorationLine: "underline" }]} >
                                @{snapchat}
                            </p>
                        </a>
                    </div> : <div></div>}
    
                    {tiktok ? <div source={require("../../res/images/profiles/TikTokBackground.png")} style={styles.infoContainer}>
                        <a style={styles.infoContainer} onPress={() => this.openTikTok()}>
                            <img style={[styles.iconLeft, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/TikTok.png")} />
                            <img style={[styles.iconRight, { width: iconSize, height: iconSize }]} source={require("../../res/images/profiles/TikTok.png")} />
                            <p style={[styles.name, { fontSize: nameFontSize, lineHeight: nameFontSize * 1.2, textDecorationLine: "underline" }]} >
                                @{tiktok}
                            </p>
                        </a>
                    </div> : <div></div>}
    
                    <div source={require("../../res/images/profiles/ProfileText.png")} style={styles.infoContainer}>
                        <a style={styles.back} onPress={() => this.props.toggleModal()}>
                            <p style={[styles.name, { fontSize: nameFontSize, lineHeight: nameFontSize * 1.2 }]} >Close</p>
                        </a>
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
        
    }
}

const styles = {
    background: {
        alignItems: "center",
        //flexShrink: 1,
    },
    imageContainer: {
        overflow: "hidden",
        borderRadius: 2000,
        transform: [
            { scaleX: 0.9 },
            { scaleY: 0.9 }
        ]
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
    image: {
        height: "100%",
        flex: 1
    },
    textContainer: {
        width: "100%",
        height: "10vh",
        justifyContent: "center",
        alignItems: "center",
        margin: 3,
    },
    infoContainer: {
        width: "100%",
        height: "7vh",
        justifyContent: "center",
        alignItems: "center",
        //marginVertical: 3,
        //marginHorizontal: 20,
        margin: 3,
    },
    iconLeft: {
        position: "absolute",
        left: 10,
        //flex: 1,
        //marginHorizontal: 20,
    },
    iconRight: {
        position: "absolute",
        right: 10,
    },
    name: {
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "Calisto MT",
        color: "#ffffff",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,

    },
    amount: {
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "Cash Currency",
        //color: "#85bb65",
        //color: "#d7d9cb",
        color: "#a2ce8f",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
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