import React, { Component } from 'react';

export default class TextContainer extends Component {

    render() {
        const { topThree } = this.props;
        
        let topThreeTransform = topThree ? {transform: "translate(0px, 12%)"} : {}

        return (
            <div style={{...styles.container, ...topThreeTransform}}>
                <div style={styles.textContainer}>
                    {/* <p style={styles.name}>Name</p> */}
                    <div style={styles.name}>Name</div>

                </div>
                <div style={styles.textContainer}>
                    {/* <p style={styles.name}>10.99$</p> */}
                    <div style={styles.currency}>10.99$</div>
                </div>
            </div>
        );
    }
}


const styles = {
    container: {
        // backgroundColor: "blue",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    textContainer: {
        // backgroundColor: "yellow",
        // display: "flex",
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    name: {
        color: "white",
        fontFamily: "Calisto MT",
        color: "#ffffff",
        textShadow: "1px 1px 3px #000000",
        fontWeight: 'bold'
    },
    currency: {
        color: "white",
        fontFamily: "Cash Currency",
        color: "#a2ce8f",
        textShadow: "1px 1px 3px #000000",
        letterSpacing: 1,
    }

}