import React, { Component } from 'react';
import { Link } from "react-router-dom";
import local from '../local';
export default class MainPage extends Component {
    state = {
        local: {}
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
            <div className="container">
                <Link to="/pay">{local.makeA}</Link>
            </div>
        );
    }
}
