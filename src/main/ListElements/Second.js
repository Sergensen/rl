import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import placeBg from '../../res/images/profiles/Platz2_Profil.png'
import AksCrossed from '../../res/images/profiles/Aks_Crossed.png';



export default class Second extends Component {



    render() {
        const { user } = this.props;

        return (
            <div style={styles.container}>
                <ImageContainer topThree user={user} />
                <TextContainer topThree user={user} />
                <img src={AksCrossed} style={styles.aksCrossed} />

            </div>
        );
    }
}


const styles = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        backgroundImage: `url(${placeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
    },
    aksCrossed: {
        position: "absolute",
        bottom: "32%",
        height: "40%",
        width: "auto",
        alignSelf: "center"
    }

}