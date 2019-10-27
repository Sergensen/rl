import React, { Component } from 'react';

export default class Fail extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.fail} className="specialbody">
                    <h1 id="paytext">Something went wrong.</h1> <br />
                    <h1 id="paytext">You won't be charged.</h1> <br />
                    <a href="pay" id="paytext">Go back</a>
                </div>
            </div>
        );
    }
}


const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
    },
    fail: {
        maxWidth: 900,
        flex: 1
    }
}
