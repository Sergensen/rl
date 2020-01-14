import React, { Component } from 'react';
import { motion } from "framer-motion"
import { globalIntro } from '../../Globals'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default class TextContainer extends Component {

    state = {
        nameFontSize: 1,
        amountFontSize: 1,
        opacity: 1,
        moving: false,
        opacity: 1,
    }


    componentDidMount() {
        const { first, topThree, user } = this.props;

        const topThreeFactor = first ? 0.6 : topThree ? 0.85 : 1;

        let uniqueName = "Anonymous";
        let amount = 0;

        if (user) {
            uniqueName = user.uniqueName;
            amount = user.amount;
        }

        const width = this.textContainer.clientHeight * topThreeFactor;
        const height = this.textContainer.clientWidth * 0.5 * topThreeFactor;
        const nameFontSize = Math.sqrt(width * height / (uniqueName.length * 2))
        const amountFontSize = Math.sqrt(width * height / (("" + amount).length + 20))

        this.setState({ nameFontSize, amountFontSize })
    }

    onTap() {
        this.props.toggleModal();
        this.setState({opacity: 1});
    }

    onTapStart(){
        this.setState({opacity: 0.6});
    }

    onTapCancel(){
        this.setState({opacity: 1});
    }


    render() {
        const { topThree, user, position } = this.props;
        const { nameFontSize, amountFontSize, opacity } = this.state;

        let uniqueName = "";
        let amount;

        if (user) {
            uniqueName = user.uniqueName;
            amount = user.amount;
        }

        let topThreeTransform = topThree ? { transform: "translate(0px, 16%)" } : {}
        return (
            <div
            ref={ref => this.textContainer = ref} style={{ ...styles.container, ...topThreeTransform, opacity }}>
                {user && <motion.div onPointerDown={this.onTapStart.bind(this)} onPointerCancel={this.onTapCancel.bind(this)} onTap={this.onTap.bind(this)} custom={position} initial="hidden" animate="visible" variants={globalIntro} style={{...styles.animationContainer}}>
                    <div style={styles.textContainer}>
                        <div style={{ ...styles.name, fontSize: nameFontSize }}>{uniqueName}</div>
                    </div>
                    <div style={styles.textContainer}>
                        <div style={{ ...styles.currency, fontSize: amountFontSize }}>{amount ? formatter.format(amount) : ""}</div>
                    </div>
                </motion.div>}
            </div>

        );
    }
}


const styles = {
    animationContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer'
    },
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer'
    },
    textContainer: {

    },
    name: {
        color: "white",
        fontFamily: "Calisto MT",
        textShadow: "1px 1px 3px #000000",
        fontWeight: 'bold',
        textAlign: "center",
        lineHeight: "1.1em",
    },
    currency: {
        color: "white",
        fontFamily: "Cash Currency",
        color: "#a2ce8f",
        textShadow: "1px 1px 3px #000000",
        letterSpacing: 1,
        textAlign: "center",
        lineHeight: "1.6em",
    }

}