import React, { Component } from 'react';

export default class Progress extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.fail} className="specialbody">
                    <h1 id="paytext">Thank you for your purchase.</h1> <br />
                    <h1 id="paytext">We are processing your payment now.</h1> <br />
                    <h1 id="paytext">You will receive a confirmation email.</h1> <br />
                    <h1 id="paytext">Check your inbox.</h1> <br />
                    <h1 id="paytext">This process can take up to 10 minutes.</h1> <br />
                    <h1 id="paytext">If you don't receive a confirmation email you wont be charged.</h1> <br />
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
    },
    fail: {
        height: "100vh",
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    }
}
