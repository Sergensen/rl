import React, { Component } from 'react';
import HeartImage from '../../res/images/profiles/heart.png'
import { motion } from "framer-motion"

export default class PropsListElement extends Component {
    state = {
        nameFontSize: 15,
        height: 50,
    }

    componentDidMount() {
        const height = this.propsList.clientHeight ;
        this.setState({ height});
    }

    render() {
        const { nameFontSize, height } = this.state;
        let { uniqueName, props, imgUrl } = this.props.user;

        return (
            <div ref={ref => this.propsList = ref} style={styles.container}>
                {/* <ImageContainer {...this.props} toggleModal={() => this.toggleModal()} user={{...user}} /> */}
                <div style={styles.motionContainer}>
                    <div
                        style={{
                            ...styles.imageContainer, width: height, height: height, backgroundImage: `url(${imgUrl})`,
                            border: '3px solid #393939',
                        }}
                        ref={(ref) => this.imageCanvas = ref}
                    >
                    </div>
                </div>
                <div style={{ ...styles.name, fontSize: nameFontSize }}>{uniqueName}</div>
                <motion.div 
                // custom={position} initial={{ opacity: 0 }} animate={opacityStateProps} variants={variants} 
                style={{ ...styles.propsTextBackground, fontSize: height * 0.2 }}>
                    <img style={{...styles.heartImage, width: height * 0.2, height: height * 0.2}} src={HeartImage} />
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
        position: "relative"
        //justifyContent: "center",
    },
    name: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: "white",
        fontFamily: "Calisto MT",
        textShadow: "1px 1px 3px #000000",
        fontWeight: 'bold',
        textAlign: "center",
    },
    motionContainer: {
        // touchAction: "pan-y",
        // display: "flex",
        // flex: 1,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
    },
    imageContainer: {
        backgroundColor: "rgba(0,0,0,0)",
        overflow: "hidden",
        borderRadius: "100%",
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    propsTextBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        pointerEvents: 'none',
        height: "30%",
        width: "auto",
        display: "flex",
        backgroundColor: "#EB4956",
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderRadius: "25px",
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
        // fontSize: "10%"
    },


}