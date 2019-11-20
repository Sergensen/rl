import React, { Component } from 'react';
import Checkout from './checkout/Checkout';
import Legal from './main/Legal';
import Terms from './main/Terms';
import Privacy from './main/Privacy';
import Datenschutz from './main/Datenschutz';
import AGB from './main/AGB';
import Impressum from './main/Impressum';
import Widerruf from './main/Widerruf';
import Withdraw from './main/Withdraw';
import HEAD from './res/logo_header.png';
import MainPage from './main/MainPage';
import Fail from './main/Fail';
import Success from './main/Success';
import Validation from './main/Validation';
import CookieConsent from "react-cookie-consent";

import local from './local';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class App extends Component {
    state = {
        local: null,
    }

    componentDidMount(){
        const userLang = navigator.language || navigator.userLanguage; 
        this.setState({
            local: userLang==="de-DE" ? local.de : local.en,
        });
    }

    render() {
        const { local } = this.state;
        return (
            <Router>
                <div style={styles.headerContainer}>
                    <a href="/">
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
                    <Route path="/validation">
                        <Validation />
                    </Route>
                    <Route path="/fail">
                        <Fail />
                    </Route>
                    <Route path="/success">
                        <Success />
                    </Route>
                    <Route path="/withdraw">
                        <Withdraw />
                    </Route>
                    <Route path="/widerruf">
                        <Widerruf /> 
                    </Route>
                    <Route path="/terms">
                        <Terms />
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
                        <MainPage />
                    </Route>
                </Switch>
                {local && <div style={styles.footer}>
                    <div style={styles.links} ref={ref => this.footer = ref}>
                        <Link style={styles.link} to={local.toLegal}>{local.tos6}</Link>
                        <Link style={styles.link} to={local.toTerms}>{local.tos7}</Link>
                        <Link style={styles.link} to={local.toPrivacy}>{local.tos4}</Link>
                    </div>
                </div>}

                {local && <CookieConsent 
                    onAccept={() => {}}
                    onDecline={() => {}}
                    buttonText={local.buttonText}
                    declineButtonText={local.declineButtonText}
                    enableDeclineButton
                    style={{ fontSize: "2vh"}}> 
                        {local.cookies1}
                        <a style={{color: "white"}} href={local.toPrivacy}>{local.tos4}</a> 
                        {local.cookies2}
                </CookieConsent>}
            </Router>
        );
    }
}

const styles = {
    footer: {
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        borderTop: "1px solid grey",
        position: "fixed",
        alignItems: "center",
        backgroundColor: "black",
    },
    links: {
        justifyContent: "space-around",
        display: "flex",
        flex: 1,
        height: "100%"
    },
    link: {
        color: "white",
        fontFamily: "sans-serif",
        textDecoration: "none",
        textAlign: "center",
        verticalAlign: "middle",
        padding: 5,
        flex: 1,
        fontSize: "1.85vh",
        height: "100%"
    },
    headerImg: {
        maxWidth: "900px",
        width: "100%",
        height: "100%",
        flex: 1
    },
    headerContainer: {
        flex: 1,
        width: "100%",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center"
    }
};