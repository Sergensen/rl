import React, { Component } from 'react';

export default class Success extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.success} className="specialbody">
                    <h1 id="paytext">Payment successful, check your Email inbox!</h1> <br />
                    <h1 id="paytext">Download the app and check your rank!</h1> <br />
                    <a href="pay" id="paytext">Or go back</a>
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
    success: {
        maxWidth: 900,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    }
}
