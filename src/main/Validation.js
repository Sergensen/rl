import React, { Component } from 'react';
import API from '../api';

export default class Validation extends Component {
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const uniqueKey = urlParams.get('uniqueKey');
        const uniqueName = urlParams.get('uniqueName');
        const amount = urlParams.get('amount');
        const mail = urlParams.get('mail');
        const message = urlParams.get('message');
        const paymentId = urlParams.get('paymentId');
        const token = urlParams.get('token');
        const PayerID = urlParams.get('PayerID');

        if(uniqueKey && uniqueName && amount && mail && paymentId && PayerID && token) {
            fetch(API.API_URL + "websuccess", {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uniqueKey, uniqueName, amount, mail, message, paymentId, token,PayerID
                })
            }).then(res => {
                console.log("Then");
                res.json().then(val => {
                    window.location = val.url;
                });
            }).catch(err => {
                console.log(err);
                alert("Something went wrong. You are not charged.");
            });
        } else {
            alert("Something went wrong. You are not charged.");
        }
    }
    render() {
        return (
            <div className="specialbody">
                <h2 id="paytext">Wait a moment.</h2> <br />
                <h1 id="paytext">Validating paypal payment...</h1> <br />
            </div>
        );
    }
}
