import React, { Component } from 'react';
import AnonymousImage from '../../res/images/profiles/ProfileIcon.png'
import * as loadImage from 'blueimp-load-image';

export default class ImageContainer extends Component {
    state = {
        user: {}
    }

    componentDidMount() {
        const height = this.imageContainer.clientHeight * 0.95;
        this.setState({ height });
    }

    componentDidUpdate() {
        let { user } = this.props;

        if(user && user.imgUrl && !user.imgBase64 && !user.uniqueName !== 'Anonymous') {
            loadImage(user.imgUrl, async (canvas) => {
                user.imgBase64 = canvas.toDataURL();
                this.setState({user, update: true});
            }, { orientation: true });
        }
    }

    render() {
        let { topThree, user } = this.props;
        const { height } = this.state;

        user = this.state.user ? this.state.user : user;

        let topThreeTransform = topThree ? { transform: "translate(0px, 23%) scale(0.85)" } : {};

        let imgUrl = user && user.imgBase64 ? user.imgBase64 : AnonymousImage;

        return (
            <div ref={ref => this.imageContainer = ref} style={{ ...styles.container, ...topThreeTransform }}>
                <div
                    style={{
                        ...styles.imageContainer, width: height, height: height, backgroundImage: `url(${imgUrl})`, 
                        border: topThree ? '0px solid #393939' : '3px solid #393939',
                    }}
                    ref={(ref) => this.imageCanvas = ref}
                >
                    {/* <img src={imgUrl} crossOrigin="anonymous"
                        style={styles.image} /> */}
                </div>
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

}