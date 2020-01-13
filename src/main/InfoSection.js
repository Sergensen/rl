import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import {
    isMobile
} from "react-device-detect";
export default class InfoSection extends Component {
    renderQuestions() {
        const FAQ = [
            {
                q: "What is RichList?",
                a: "RichList is the first platform to show how rich you really are. Our members are proving how much money they can spend for nothing. Without giving a single fuck. The ranking shows the top 10 members sorted by the amount of money they’ve spent."
            },
            {
                q: "What is a payment key?",
                a: "After your first payment you will receive your personal payment key in a confirmation email. If you want to make additional payments to increase your rank, you have to provide your payment key at the checkout form. Check your email spam folder."
            },
            {
               q: "Is this real money?",
               a: "Yes, real money from real people."
            },
            {
               q: "Will the money I spend be added together?",
               a: "Yes. If you’ve spent $1000 and spent another $500, you will have a total of $1,500 spent on RichList. More at 'What is a payment key?'"
            },
            {
               q: "I want to change my profile information.",
               a: "You have to make another payment and only fill out the fields you want to change. E.g. if you want to change your displayed Instagram name, only fill out the Instagram field. This also applies to the profile picture. Don't forget to provide your payment key which you've received in a confirmation email after your first payment. If you don't find this email check your spam folder."
            },
        ];

        return FAQ.map((elem, i) => {
            return (
                <Card key={i} style={styles.card}>
                    <Accordion.Toggle style={{backgroundColor: 'rgba(0,0,0,0.75)'}} as={Card.Header} eventKey={i}>
                        <b>{elem.q}</b>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i}>
                    <Card.Body>{elem.a}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        })
    }
    render() {
        return (
            <div style={{width: "100%"}}>
                <div style={styles.faq}><b>FAQ</b></div>
                <Accordion style={styles.container}>
                    {this.renderQuestions()}
                </Accordion>
            </div>
            
        );
    }
}

const styles = {
    faq: {
        border: '1px solid #424242',
        borderWidth: '2px 0 0 0',
        textAlign: 'center',
        color: 'white',
        fontSize: isMobile ?  window.innerHeight*0.04 : window.innerHeight*0.03
    },
    card: {
        color: 'white',
        border: '1px solid #424242',
        backgroundColor: 'rgba(16,16,16,0.75)',
    },
    container: {
        border: '1px solid #424242',
        maxWidth: 500,
        width: '100%',
        fontSize: isMobile ?  window.innerHeight*0.03 : window.innerHeight*0.02
    },
}
