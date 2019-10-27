import React, { Component } from 'react';

export default class Fail extends Component {
    render() {
        return (
            <div className="specialbody">
                <h1 id="paytext">Something went wrong.</h1> <br />
                <h1 id="paytext">You won't be charged.</h1> <br />
                <a href="pay" id="paytext">Go back</a>
            </div>
        );
    }
}
