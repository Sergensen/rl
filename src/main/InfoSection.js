import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';

export default class InfoSection extends Component {
    render() {
        return (
            <Accordion style={styles.container}>
            <Card style={styles.card}>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <b>What is this all about? </b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>Actually you just pay money to get on the list.</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card style={styles.card}>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    <b>Did these girls and guys pay real money?</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>Yes.</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card style={styles.card}>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                    <b>What is a payment key? </b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                <Card.Body>After your first payment you will receive your personal payment key in a confirmation email. If you want to make additional payments to increase your rank, you have to provide your payment key at the checkout form.</Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        );
    }
}

const styles = {
    card: {
        color: 'white',
        border: '1px solid darkgrey',
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    container: {
        border: '1px solid grey',
        maxWidth: 500,
        width: '100%'
    },
}
