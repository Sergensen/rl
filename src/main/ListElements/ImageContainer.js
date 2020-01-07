import React, { Component } from 'react';
import AnonymousImage from '../../res/images/profiles/ProfileIcon.png'
import HeartImage from '../../res/images/profiles/heart.png'
import * as loadImage from 'blueimp-load-image';

export default class ImageContainer extends Component {
    state = {
        user: {},
        moving: false,
        imgBase64: {},
    }

    componentDidMount() {
        const height = this.imageContainer.clientHeight * 0.95;
        this.setState({ height, tempHeight: height * 0.95 });
    }

    componentDidUpdate() {
        const { uniqueName } = this.state;
        let { user } = this.props;

        if (user && user.imgUrl && uniqueName !== user.uniqueName && !user.uniqueName !== 'Anonymous') {
            loadImage(user.imgUrl, async (canvas) => {
                let imgBase64 = canvas.toDataURL();
                //imgBase64 = user.imgUrl;
                this.setState({ imgBase64, uniqueName: user.uniqueName });
            }, { orientation: true });
        }
    }

    onMouseUp() {
        const { addPropsToUser } = this.props;
        const { moving, uniqueName } = this.state;
        this.setState(prev => ({
            height: prev.tempHeight,
            tempHeight: prev.height,
            moving: false
        }))
        if (!moving && uniqueName && uniqueName !== "Blocked User" && uniqueName !== "Anonymous" && uniqueName !== "Banned user") {
            addPropsToUser(uniqueName)
        }


        // this.props.toggleModal();
    }

    onMouseDown() {
        this.setState(prev => ({
            height: prev.tempHeight,
            tempHeight: prev.height,
        }))
    }

    render() {
        let { topThree, user, localProps } = this.props;
        const { height, imgBase64 } = this.state;

        let topThreeTransform = topThree ? { transform: "translate(0px, 23%) scale(0.85)" } : {};

        let imgUrl = imgBase64 || AnonymousImage;
        let propsCount = user && user.props ? user.props : 0;
        propsCount += localProps || 0

        return (
            <div onMouseDown={() => this.onMouseDown()} onMouseUp={() => this.onMouseUp()} onTouchMove={() => this.setState({ moving: true })} onTouchStart={() => this.onMouseDown()} onTouchEnd={() => this.onMouseUp()} ref={ref => this.imageContainer = ref} style={{ ...styles.container, ...topThreeTransform }}>
                <div
                    style={{
                        ...styles.imageContainer, width: height, height: height, backgroundImage: `url(${imgUrl})`,
                        border: topThree ? '0px solid #393939' : '3px solid #393939',
                    }}
                    ref={(ref) => this.imageCanvas = ref}
                >
                </div>

                {/* <div style={{ ...styles.mainPropsContainer }}> */}
                <div style={{ ...styles.propsTextBackground }}>
                    <img style={styles.heartImage} src={HeartImage} />
                    <div style={{ ...styles.propText }}>{propsCount}</div>
                </div>
                {/* </div> */}
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
    imageContainer: {
        backgroundColor: "black",
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
    // image: {
    //     height: "100%",
    //     width: "auto",
    // },
    mainPropsContainer: {

        // left: 0,
        // right: 0,
        // bottom: 0,
        // alignItems: 'center',

        // opacity: 0,
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
        // height: "100%",
        // width: "auto",
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