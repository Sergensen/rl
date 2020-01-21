import React, { Component } from 'react';
import Checkout from './checkout/Checkout';
import Legal from './main/Legal';
import Terms from './main/Terms';
import Privacy from './main/Privacy';
import Datenschutz from './main/Datenschutz';
import AGB from './main/AGB';
import Impressum from './main/Impressum';
import HEAD from './res/logo_header.png';
import parental from './res/images/parentalAdvisoryLogo.png';
import MainList from './main/MainList';
import Fail from './main/Fail';
import Progress from './main/Progress';
import Success from './main/Success';
import CookieConsent from "react-cookie-consent";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import API from './api';

import local from './local';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default class App extends Component {
    state = {
        local: null,
        data: []
    }

    async componentDidMount() {
        const userLang = navigator.language || navigator.userLanguage;
        this.fetchData();

        this.setState({
            interval: setInterval(this.fetchData.bind(this), 10000),
            local: userLang === "de-DE" ? local.de : local.en,
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    fetchData(){
        API.getTop10().then(users => {
            API.getProps(users).then(data => {
                this.setState({ data });
                // API.getTop10().then(data => this.setState({ data }));
            });
        });

    }

    render() {
        const { local, data } = this.state;
        return (
            <Router>
                <div style={styles.headerContainer}>
                    <a style={styles.headerLink} href="/">
                        <img alt="Logo" src={HEAD} style={styles.headerImg} />
                    </a>
                </div>
                <Switch>
                    <Route path="/pay">
                        <Checkout />
                    </Route>
                    <Route path="/legal">
                        <Legal />
                    </Route>
                    <Route path="/impressum">
                        <Impressum />
                    </Route>
                    <Route path="/fail">
                        <Fail />
                    </Route>
                    <Route path="/success">
                        <Success />
                    </Route>
                    <Route path="/terms">
                        <Terms />
                    </Route>
                    <Route path="/progress">
                        <Progress />
                    </Route>
                    <Route path="/agb">
                        <AGB />
                    </Route>
                    <Route path="/datenschutz">
                        <Datenschutz />
                    </Route>
                    <Route path="/privacy">
                        <Privacy />
                    </Route>
                    <Route path="/">
                        <MainList data={data} />
                    </Route>
                </Switch>
            
                {local && <div style={styles.footer}>
                    <MDBFooter color="blue" className="font-small pt-4 mt-4">
                        <MDBContainer fluid className="text-center text-md-left">
                            <MDBRow>
                                <MDBCol md="5">
                                    <h5 className="title">Support</h5>
                                    <p>{local.support}</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <h5 className="title">Links</h5>
                                    <ul style={styles.listcontainer}>
                                        <li>
                                            <a style={styles.link} href={local.toLegal}>{local.tos6}</a>
                                        </li>
                                        <li>
                                            <a style={styles.link} href={local.toTerms}>{local.tos7}</a>
                                        </li>
                                        <li>
                                            <a style={styles.link} href={local.toPrivacy}>{local.tos4}</a>
                                        </li>
                                    </ul>
                                </MDBCol>
                                <MDBCol md="3">
                                    <img alt="prnt" style={styles.parental} src={parental} />
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <div className="footer-copyright text-center py-3">
                            <MDBContainer fluid>
                                &copy; {new Date().getFullYear()} Made for 💰 by RichList
                            </MDBContainer>
                        </div>
                    </MDBFooter>
                </div>}

                {local && <CookieConsent
                    onAccept={() => { }}
                    onDecline={() => { }}
                    buttonText={local.buttonText}
                    declineButtonText={local.declineButtonText}
                    enableDeclineButton
                    style={{ fontSize: "2vh" }}>
                    {local.cookies1}
                    <a style={{ color: "white" }} href={local.toPrivacy}>{local.tos4}</a>
                    {local.cookies2}
                </CookieConsent>}
            </Router>
        );
    }
}

const styles = {
    footer: {
        bottom: 0,
        color: "lightgrey",
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid grey",
        backgroundColor: "black",
    },
    link: {
        color: "white",
        fontFamily: "sans-serif",
    },
    headerImg: {
        maxWidth: "500px",
        width: "100%",
        height: "100%",
        flex: 1
    },
    headerContainer: {
        flex: 1,
        width: "100%",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        paddingBottom: 5,
    },
    headerLink: {
        marginTop: "1vh",
        maxWidth: "80%"
    },
    listcontainer: {
        textAlign: "left"
    },
    parental: {
        width: "50%",
        height: "auto"
    }
};