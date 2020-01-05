import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import ModalContainer from './ModalContainer';

export default class ListElement extends Component {
    state = {
        show: true
    }

    toggleModal() {
        this.setState(prev => ({
            show: !prev.show
        }))
    }

    render() {
        const { show } = this.state;
        return (
            <div style={styles.container}>
                <ImageContainer />
                <ModalContainer toggleModal={() => this.toggleModal()} show={show} {...this.props} />
                <TextContainer />
            </div>
        );
    }
}


const styles = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
    }

}