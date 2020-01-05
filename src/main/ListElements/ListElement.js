import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';



export default class ListElement extends Component {



    render() {
        const { user } = this.props;

        // console.log(user);

        return (
            <div style={styles.container}>
                <ImageContainer user={user}/>
                <TextContainer user={user}/>
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