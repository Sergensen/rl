import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import placeBg from '../../res/images/profiles/Platz2_Profil.png'



export default class Second extends Component {



    render(){

        return(
            <div style={styles.container}>

            </div>
        );
    }
}


const styles = {
    container: {
        width: "100%",
        display: "flex",
        //justifyContent: "center",
        backgroundImage: `url(${placeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

}