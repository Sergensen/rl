import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';



export default class ListElement extends Component {



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
        width: "100%",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
    }

}