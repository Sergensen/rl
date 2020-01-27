import React, { Component } from 'react';
import Checkout from './checkout/Checkout';
import SecondPayment from './checkout/SecondPayment';
import FirstPayment from './checkout/FirstPayment';
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

import { Button } from 'react-bootstrap';

export default class App extends Component {
    state = {
        local: null,
        data: []
    }

    async componentDidMount() {
        const userLang = navigator.language || navigator.userLanguage;
        this.fetchData(true);

        this.setState({
            interval: setInterval(this.fetchData.bind(this), 10000),
            local: userLang === "de-DE" ? local.de : local.en,
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    fetchData(withProps = false){
        API.getTop10().then(users => {
            if(withProps) API.getProps(users.output).then(data => {
                this.setState({ data, online: users.online });
                // API.getTop10().then(data => this.setState({ data }));
            });
            if(!withProps) this.setState({ data: users.output, online: users.online });
        });
    }

    resetCookiesAndReload(){
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.href = '/'
    }

    render() {
        const { local, data, online } = this.state;

        console.log(online);
        
        return (
            <Router>
                <div style={styles.headerContainer}>
                    <a style={styles.headerLink} href="/">
                        <img alt="Logo" src={HEAD} style={styles.headerImg} />
                    </a>
                </div>
                <Switch>
                    <Route path="/pay" exact>
                        <Checkout />
                    </Route>
                    <Route path="/pay/first">
                        <FirstPayment />
                    </Route>
                    <Route path="/pay/next">
                        <SecondPayment />
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
                                    <Button onClick={this.resetCookiesAndReload.bind(this)} variant="dark" style={{margin: "10px 0 10px 0"}}>Reset cookie settings</Button>
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
                                    <p style={{color: "rgb(150, 150, 150)"}}>This site is protected by reCAPTCHA and the Google
                                    <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
                                    <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
                                    </p>
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