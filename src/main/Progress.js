import React, { Component } from 'react';

export default class Progress extends Component {
    render() {
        return (
                <div style={styles.container}>
                    <div style={styles.success} className="specialbody">
                        <h1 id="paytext">
                        Thank you for your purchase, we are processing your payment now. 🎉😍
                        <br /><br />
                        <div style={{color: "red"}}>Important!</div>
                        You will receive a confirmation E-Mail with your personal <b>payment key</b>!
                        You need your <b>payment key</b> for additional payments.
                        <br /><br />
                            If you don't receive a confirmation email you won't be charged.
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",

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
