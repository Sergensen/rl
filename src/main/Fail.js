import React, { Component } from 'react';

export default class Fail extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.fail} className="specialbody">
                    <h1 id="paytext">Something went wrong during the payment process.</h1> <br />
                    <h1 id="paytext">You will not be charged. Maybe someone else has used your username while you were paying.</h1> <br />
                    <a href="pay" id="paytext">Go back and try again</a>
                </div>
            </div>
        );
    }
}


const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        height: "90vh",
    },
    fail: {
        maxWidth: 900,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    }
}
