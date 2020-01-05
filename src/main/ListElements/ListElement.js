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
        const { user } = this.props;

        return (
            <div style={styles.container}>
                <ImageContainer user={user} />
                <ModalContainer user={user} toggleModal={() => this.toggleModal()} show={show} {...this.props} />
                <TextContainer user={user} />
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