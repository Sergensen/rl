import API from '../api';
import React, { Component } from 'react';

export default class Modal extends Component {
    state = {
        data: {}
    }

    componentDidMount(){
        API.getTop10().then(data => this.setState({data}));
    }

    render() {
        const {data} = this.state;
        return (
            <div style={styles.main}>
            </div>
        );
    }
}

const styles = {
    main: {

    }
}