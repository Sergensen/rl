import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import ModalContainer from './ModalContainer';

export default class ListElement extends Component {
    state = {
        show: false
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
                <ImageContainer {...this.props} toggleModal={() => this.toggleModal()} user={user} />
                {user && <ModalContainer user={user} toggleModal={() => this.toggleModal()} show={show} {...this.props} />}
                <TextContainer toggleModal={() => this.toggleModal()} user={user} />
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