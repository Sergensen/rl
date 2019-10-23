import React, { Component } from 'react';

export default class Success extends Component {
    render() {
        return (
            <div class="specialbody">
                <h1 id="paytext">Payment successful!</h1> <br />
                <h1 id="paytext">Download the app and check your rank!</h1> <br />
                <a href="pay" id="paytext">Or go back</a>
            </div>
        );
    }
}
