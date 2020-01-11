import React, { Component } from 'react';
import AnonymousImage from '../../res/images/profiles/ProfilePlaceholder.jpg'
import HeartImage from '../../res/images/profiles/heart.png'
import * as loadImage from 'blueimp-load-image';
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
        imgBase64: {},
        uniqueName: "",
        opacityState: "initial",
        timer: false,
        oldProps: -1,
    }

    componentDidMount() {
        const height = this.imageContainer.clientHeight * 0.95;
        this.setState({ height, tempHeight: height * 0.95 });
    }

    componentDidUpdate() {
        const { uniqueName } = this.state;
        let { user } = this.props;

        if (user) {
            if (user.imgUrl && uniqueName !== user.uniqueName && !user.uniqueName !== 'Anonymous') {
                loadImage(user.imgUrl, async (canvas) => {
                    //let imgBase64 = canvas.toDataURL();
                    let imgBase64 = user.imgUrl;
                    this.setState({ imgBase64, uniqueName: user.uniqueName });
                }, { orientation: true });
            }

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



        //if (props > this.oldProps) this.animateUpdatedProps();

        //this.oldProps = props;
    }

    onMouseUp() {
        const { addPropsToUser } = this.props;
        const { moving, uniqueName } = this.state;
        this.setState(prev => ({
            height: prev.tempHeight,
            tempHeight: prev.height,
            moving: false,
        }))
        if (!moving && uniqueName && uniqueName !== "Blocked User" && uniqueName !== "Anonymous" && uniqueName !== "Banned user") {
            addPropsToUser(uniqueName)
        }


        this.startPropsAnimation("startHiding");
    }

    onMouseDown() {
        this.setState(prev => ({
            height: prev.tempHeight,
            tempHeight: prev.height,
        }))
    }

    startPropsAnimation(newState) {
        this.setState({ opacityState: "" }, () => this.setState({ opacityState: newState }));
    }

    render() {
        // let propsControls = useAnimation();
        let { topThree, user, localProps, position } = this.props;
        const { height, imgBase64, uniqueName, opacityState } = this.state;

        const hideProps = uniqueName === "" || uniqueName === "Anonymous" || uniqueName === "Banned user" || uniqueName === "Blocked user"
        let topThreeTransform = topThree ? { transform: "translate(0px, 23%) scale(0.85)" } : {};

        let imgUrl = imgBase64 || AnonymousImage;
        // let imgUrl = AnonymousImage;
        // if(user){
        //     imgUrl = user.imgUrl;
        // }


        let propsCount = user && user.props ? user.props : 0;
        propsCount += localProps || 0;


        return (
            <div
                onMouseDown={() => this.onMouseDown()} onMouseUp={() => this.onMouseUp()}
                onTouchMove={() => this.setState({ moving: true })}
                //onTouchStart={() => this.onMouseDown()} onTouchEnd={() => this.onMouseUp()} 
                ref={ref => this.imageContainer = ref} style={{ ...styles.container, ...topThreeTransform }}>
                {user ?
                    <motion.div custom={position} initial="hidden" animate="visible" variants={globalIntro} style={styles.motionContainer}>
                        <div
                            style={{
                                ...styles.imageContainer, width: height, height: height, backgroundImage: `url(${imgUrl})`,
                                border: topThree ? '0px solid #393939' : '3px solid #393939',
                            }}
                            ref={(ref) => this.imageCanvas = ref}
                        >
                        </div>
                    </motion.div> :
                    <Spinner animation="border" role="status" />}


                {hideProps || <motion.div custom={position} initial={{ opacity: 0 }} animate={opacityState} variants={variants} style={{ ...styles.propsTextBackground }}>
                    <img style={styles.heartImage} src={HeartImage} />
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
        justifyContent: 'space-between',
        borderRadius: "25px",

    },
    propText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "Calisto MT",
        color: "white",
        letterSpacing: 1,
        marginRight: 10,
        fontWeight: "bold",
        // fontSize: "10%"
    },
    heartImage: {
        // position: "relative",
        height: "70%",
        width: "auto",
        // objectFit: "contain",
        // maxWidth: "10%",
        marginLeft: 10,
        marginRight: 5,
    }

}