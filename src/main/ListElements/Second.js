import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import placeBg from '../../res/images/profiles/Platz2_Profil.png'
import AksCrossed from '../../res/images/profiles/Aks_Crossed.png';
import ModalContainer from './ModalContainer';

export default class Second extends Component {
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
                <ImageContainer position={2} {...this.props} toggleModal={() => this.toggleModal()} topThree user={user} />
                {user && <ModalContainer user={user} toggleModal={() => this.toggleModal()} show={show} {...this.props} />}
                <TextContainer position={2} toggleModal={() => this.toggleModal()} topThree user={user} />
                <img alt="AK" src={AksCrossed} style={styles.aksCrossed} />
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
        position: "relative"
    },
    aksCrossed: {
        position: "absolute",
        pointerEvents: 'none',
        bottom: "32%",
        height: "40%",
        width: "auto",
        alignSelf: "center"
    }

}