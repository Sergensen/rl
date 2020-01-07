import React, { Component } from 'react';
import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import placeBg from '../../res/images/profiles/Platz1_Profil.png'
import RollsNLion from '../../res/images/profiles/RollsNLion.png';
import Mercedes from '../../res/images/profiles/BlackMercedes.png';
import ModalContainer from './ModalContainer';

export default class First extends Component {
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
                <ImageContainer  {...this.props} toggleModal={() => this.toggleModal()} topThree user={user} />
                {user && <ModalContainer user={user} toggleModal={() => this.toggleModal()} show={show} {...this.props} />}
                <TextContainer toggleModal={() => this.toggleModal()} first topThree user={user} />
                <img src={RollsNLion} style={styles.rollsNLion} />
                <img src={Mercedes} style={styles.mercedes} />
            </div>
        );
    }
}


const styles = {
    container: {
        height: 225,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        backgroundImage: `url(${placeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
    },
    rollsNLion: {
        position: "absolute",
        // left: "-8%",
        bottom: "3%",
        // width: "40%",
        width: "26%",
        height: "auto"
        //width: "100%",
        //paddingTop: "100%"
    },
    mercedes: {
        position: "absolute",
        // right: "-5%",
        right: 0,
        bottom: "2%",
        // width: "35%",
        width: "23%",
        height: "auto",
        // paddingTop: "100%",
        // width: "100%",
    }

}