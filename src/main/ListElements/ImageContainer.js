import React, { Component } from 'react';
import testImage from '../../res/images/profiles/ProfileIcon.png'

export default class ImageContainer extends Component {

    state = {
    }


    componentDidMount() {
        const height = this.imageContainer.clientHeight * 0.95;
        this.setState({ height });
    }

    render() {
        const { height } = this.state;
        const { topThree } = this.props;

        let topThreeTransform = topThree ? {transform: "translate(0px, 23%) scale(0.85)"} : {};

        return (
            <div ref={ref => this.imageContainer = ref} style={{...styles.container, ...topThreeTransform}}>
                <div
                    style={{
                        ...styles.imageContainer, width: height, height: height,
                        border: topThree ? '0px solid #393939' : '3px solid #393939',

                        // transform: [
                        //     { scaleX: imageTouchScale },
                        //     { scaleY: imageTouchScale }
                        // ]
                    }}>
                    <img src={testImage}
                        style={styles.image} />
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
        //border: '3px solid #393939'
    },
    image: {
        height: "100%",
        width: "auto",
    },

}