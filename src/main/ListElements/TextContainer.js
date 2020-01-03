import React, { Component } from 'react';

export default class TextContainer extends Component {

    render() {

        return (
            <div style={styles.container}>

            </div>
        );
    }
}


const styles = {
    container: {
        backgroundColor: "blue",
        display: "flex",
        flex: 1
        //justifyContent: "center",
    }

}