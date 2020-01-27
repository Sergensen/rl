import React, { Component } from 'react';

export default class Fail extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.success} className="specialbody">
                    <h1 id="paytext">Something went wrong during the payment process.</h1> <br />
                    <h1 id="paytext">You will not be charged. Maybe someone else has used your username while you were paying.</h1> <br />
                    <a style={{height: 50}} href="pay" id="paytext" class="link">Go back and try again</a>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    success: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        border: "1px solid grey",
        borderWidth: "1px 0 1px 0",
        backgroundColor: "black",
        maxWidth: 900,
        width: "100%",
    }
}
