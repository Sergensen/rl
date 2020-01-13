import React, { Component } from 'react';
import AnonymousImage from '../../res/images/profiles/ProfilePlaceholder.jpg'
import HeartImage from '../../res/images/profiles/heart.png'
import { motion } from "framer-motion"
import { Spinner } from 'react-bootstrap';
import { globalIntro } from '../../Globals'

const variants = {
    startHiding: {
        opacity: [1, 0],
        transition: {
            duration: 1,
            ease: "circIn",
        }
    },
    initial: i => ({
        // y: [-5, 0],
        opacity: [0, 1, 1, 1, 0],
        transition: {
            duration: 2,
            //hab extra "delay" objekt gemacht, aber wenn ich this.deplay benutze geht das nicht :(
            delay: i * 0.2,
            type: "spring"
        }
    }),
    propsUpdate: {
        opacity: [1, 1, 1, 1, 1, 1, 0],
        rotate: [0, -4, -4, -4, -4, 4, -4, 4, -4, 4, 0, 0, 0],
        scale: [1, 0.8, 0.8, 0.8, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1, 1, 1],
        transition: {
            duration: 1
        }
    }
}

export default class ImageContainer extends Component {
    state = {
        user: {},
        moving: false,
        uniqueName: "",
        opacityStateProps: "initial",
        opacityStateImage: "visible",
        timer: false,
        oldProps: -1,
        imageScale: 1,
    }

    shouldComponentUpdate(nextProps, nextState){
        if(JSON.stringify(this.props) === JSON.stringify(nextProps) && JSON.stringify(this.state) === JSON.stringify(nextState)){
            return false;
        }

        return true;
    }


    componentDidMount() {
        let { user } = this.props;

        const height = this.imageContainer.clientHeight * 0.95;

        this.setState({ height, tempHeight: height * 0.95, uniqueName: user.uniqueName });
    }

    componentDidUpdate() {
        let { user } = this.props;

        if (user) {
            const { oldProps } = this.state;


            if (oldProps === -1) {
                this.setState({ oldProps: user.props });
            }
            else if (user.props) {
                if (user.props > oldProps) {
                    this.setState({ oldProps: user.props });
                    this.startPropsAnimation("propsUpdate");
                }
            }
        }

    }

    onTap() {
        const { addPropsToUser } = this.props;
        const { uniqueName } = this.state;

        if (uniqueName && uniqueName !== "Blocked User" && uniqueName !== "Anonymous" && uniqueName !== "Banned user") {
            addPropsToUser(uniqueName)
        }

        this.startPropsAnimation("startHiding");
    }

    onTapStart(){
        this.setState({imageScale: 0.95});
    }

    onTapCancel(){
        this.setState({imageScale: 1});
    }

    startPropsAnimation(newState) {
        this.setState({ opacityStateProps: "", imageScale: 1 }, () => this.setState({ opacityStateProps: newState }));
    }

    startImageAnimation(newState) {
        this.setState({ opacityStateImage: "" }, () => this.setState({ opacityStateImage: newState }));
    }

    render() {
        let { topThree, user, localProps, position } = this.props;
        const { height, uniqueName, opacityStateProps, opacityStateImage, imageScale } = this.state;

        const hideProps = uniqueName === "" || uniqueName === "Anonymous" || uniqueName === "Banned user" || uniqueName === "Blocked user"
        let topThreeTransform = topThree ? { transform: "translate(0px, 23%) scale(0.85)" } : {};

        let imgUrl = user ? user.imgUrl : AnonymousImage;

        let propsCount = user && user.props ? user.props : 0;
        propsCount += localProps || 0;

        return (
            <div                
                ref={ref => this.imageContainer = ref} style={{ ...styles.container, ...topThreeTransform }}>
                {user ?
                    <motion.div onPointerDown={this.onTapStart.bind(this)} onPointerCancel={this.onTapCancel.bind(this)} onTap={this.onTap.bind(this)} custom={position} initial="hidden" animate={opacityStateImage} variants={globalIntro} style={styles.motionContainer}>
                        <div
                            style={{
                                ...styles.imageContainer, width: height, height: height, backgroundImage: `url(${imgUrl})`, transform: "scale("+imageScale+")",
                                border: topThree ? '0px solid #393939' : '3px solid #393939',
                            }}
                            ref={(ref) => this.imageCanvas = ref}
                        >
                        </div>
                    </motion.div> :
                    <Spinner animation="border" role="status" />}


                {hideProps || <motion.div custom={position} 
                // initial={{ opacity: 0 }} animate={opacityStateProps} variants={variants} 
                style={{ ...styles.propsTextBackground, fontSize: height * 0.2 }}>
                    <img style={{...styles.heartImage, width: height * 0.2, height: height * 0.2}} src={HeartImage} />
                    <div style={{ ...styles.propText }}>{propsCount}</div>
                </motion.div>}
            </div>
        );
    }
}


const styles = {
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",

    },
    motionContainer: {
        touchAction: "pan-y",
        display: "flex",
        flex: 1,
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
    heartImage: {
        // position: "relative",
        // height: "70%",
        // width: "auto",
        // objectFit: "contain",
        // maxWidth: "10%",
        marginLeft: 7,
        marginRight: 5,
    }

}