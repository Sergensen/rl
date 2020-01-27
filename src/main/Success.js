import React, { Component } from 'react';

export default class Success extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.success} className="specialbody">
                    <h1 id="paytext">
                        Thank you for your purchase, we are processing your payment now.
                        You will receive a confirmation email so check your inbox!
                    </h1>  <br />
                    <h1 id="paytext">
                        This process can take up to 10 minutes. 
                        If you don't receive a confirmation email you wont be charged.
                    </h1> <br />
                    <h1 id="paytext">
                        Your confirmation email will contain your personal payment key. 
                        You will need it to make additional payments.
                    </h1>
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
