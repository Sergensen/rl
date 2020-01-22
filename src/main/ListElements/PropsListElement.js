import React, { Component } from 'react';
import HeartImage from '../../res/images/profiles/heart.png'
import { motion } from "framer-motion"
import textBackground from "../../res/images/profiles/ProfileText.png"

// const borderColors = [
//     "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
//     "linear-gradient(45deg, #f5f6f6 0%,#9e9e9e 11%,#dbdce2 21%,#d6d6d6 38%,#b8bac6 49%,#7a7a7a 63%,#dddfe3 80%,#f5f6f6 100%)",
//     "linear-gradient(135deg, rgba(176,140,87,1) 0%, rgba(128,75,0,1) 19%, rgba(156,122,60,1) 40%, rgba(128,75,0,1) 65%, rgba(176,140,87,1) 67%, rgba(137,94,26,1) 74%, rgba(176,140,87,1) 100%)"
// ]

export default class PropsListElement extends Component {
    state = {
        height: 50,
    }

    componentDidMount() {
        const height = this.propsList.clientHeight;
        this.setState({ height });
    }

    render() {
        const { position } = this.props;
        const { height } = this.state;
        let { uniqueName, props, imgUrl } = this.props.user;

        return (
            <div ref={ref => this.propsList = ref} style={{
                ...styles.container,
                // transform: "scale(" + (1 - 0.15 * position) + " )"
                // flex: (3 - position), 
                // height: ((100 - position * 10) + "%")
            }}>
                {/* <ImageContainer {...this.props} toggleModal={() => this.toggleModal()} user={{...user}} /> */}
                <div style={styles.motionContainer}>
                    <div
                        style={{
                            ...styles.imageContainer,
                            width: height * 0.7, height: height * 0.7,
                            // background: borderColors[position],

                            // backgroundImage: `url(${imgUrl})`,
                            // border: '3px solid red',
                        }}
                        ref={(ref) => this.imageCanvas = ref}
                    >
                        <div
                            style={{
                                ...styles.imageContainer,
                                // width: "92%", height: "92%",
                                backgroundImage: `url(${imgUrl})`,
                                border: '3px solid #393939',
                            }}
                        >

                        </div>
                    </div>
                </div>
                <div style={{ ...styles.name, fontSize: height * 0.115, height: height * 0.15 }}>{position + 1}. {uniqueName}</div>
                <motion.div
                    // custom={position} initial={{ opacity: 0 }} animate={opacityStateProps} variants={variants} 
                    style={{ ...styles.propsTextBackground, fontSize: height * 0.1, height: height * 0.15 }}>
                    <img style={{ ...styles.heartImage, width: height * 0.1, height: height * 0.1 }} src={HeartImage} />
                    <div style={{ ...styles.propText }}>{props}</div>
                </motion.div>
                {/* <TextContainer {...this.props} toggleModal={() => this.toggleModal()} user={user} /> */}
            </div>
        );
    }
}


const styles = {
    container: {
        width: "100%",
        height: "100%",
        // height: "100%",
        // position: "relative",
        // marginBottom: 200
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bottom: 0,
    },
    name: {
        // position: 'absolute',
        // bottom: 0,
        // right: 0,
        width: "95%",
        display: "flex",
        // flex: 1,
        color: "white",
        fontFamily: "Calisto MT",
        textShadow: "1px 1px 3px #000000",
        fontWeight: 'bold',
        textAlign: "center",
        // backgroundColor: "black",
        backgroundImage: `url(${textBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // borderRadius: "25px",
        paddingLeft: 5,
        paddingRight: 5,
        whiteSpace: "nowrap",
        // alignSelf: "center"
        justifyContent: "center",
        alignItems: "center",
    },
    motionContainer: {
        // touchAction: "pan-y",
        display: "flex",
        flex: 5,
        // left: 0,
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
    },
    imageContainer: {
        backgroundColor: "rgba(0,0,0,0)",
        overflow: "hidden",
        borderRadius: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "90%",
        height: "90%",
    },
    propsTextBackground: {
        // backgroundImage: `url(${textBackground})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundColor: 'red',
        // position: 'absolute',
        // top: 0,
        // right: 0,
        pointerEvents: 'none',
        // height: "20%",
        // width: "auto",
        display: "flex",
        // flex: 1,
        backgroundColor: "#EB4956",
        flexDirection: 'row',
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        // justifyContent: 'space-between',
        // borderRadius: "25px",
    },
    heartImage: {
        // position: "relative",
        // height: "70%",
        // width: "auto",
        // objectFit: "contain",
        // maxWidth: "10%",
        marginLeft: 7,
        marginRight: 5,
    },
    propText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "Calisto MT",
        color: "white",
        letterSpacing: 1,
        marginRight: 7,
        fontWeight: "bold",
        textShadow: "1px 1px 3px #000000",

        // fontSize: "10%"
    },


}