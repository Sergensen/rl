import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import placeBg from '../../res/images/profiles/Platz3_Profil.png'
import ModalContainer from './ModalContainer';

export default class Third extends Component {
    state = {
        show: false
    }

    toggleModal() {
        this.setState(prev => ({
            show: !prev.show
        }))
    }

    render() {
        const { user } = this.props;
        const { show } = this.state;

        return (
            <div style={styles.container}>
                <ImageContainer toggleModal={() => this.toggleModal()} topThree user={user} />
                {user && <ModalContainer user={user} toggleModal={() => this.toggleModal()} show={show} {...this.props} />}
                <TextContainer toggleModal={() => this.toggleModal()} topThree user={user} />
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
        backgroundImage: `url(${placeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

}