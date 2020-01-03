import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import placeBg from '../../res/images/profiles/Platz1_Profil.png'


export default class First extends Component {



    render() {

        return (
            <div style={styles.container}>
                <ImageContainer />
                <TextContainer />
            </div>
        );
    }
}


const styles = {
    container: {
        height: 200,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        backgroundImage: `url(${placeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

}