import React, { Component } from 'react';
import First from './ListElements/First';
import Second from './ListElements/Second';
import Third from './ListElements/Third';
import ListElement from './ListElements/ListElement';
import placeFourToSixBg from '../res/images/profiles/Platz4-6_Border.png'
import placeSevenToNineBg from '../res/images/profiles/Platz7-9_Border.png'
import { Button } from 'react-bootstrap';
import {
    isMobile
} from "react-device-detect";
export default class MainList extends Component {
    render() {
        const { data } = this.props;
        return (
            <div style={styles.main}>

                <div style={styles.container}>
                    <First user={data[0]} />

                    <div style={styles.twoAndThree}>
                        <Second user={data[1]} />
                        <Third user={data[2]} />
                    </div>

                    <div style={styles.fourToSix}>
                        {/* {this.render4to6()} */}
                        <ListElement user={data[3]} />
                        <ListElement user={data[4]} />
                        <ListElement user={data[5]} />
                    </div>

                    <div style={styles.sevenToNine} >
                        {/* {this.render7to10()} */}
                        <ListElement user={data[6]} />
                        <ListElement user={data[7]} />
                        <ListElement user={data[8]} />
                        <ListElement user={data[9]} />
                    </div>
                    <Button onClick={() => window.location.href = '/pay'} variant="primary" size="lg" block style={styles.payButton}>
                    💸 Get on the list 💸
                    </Button>
                </div>
            </div>
        );
    }
}

const styles = {
    main: {
        //backgroundColor: "red",
        width: "100%",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        justifyContent: "center",
        flex: 1,
    },
    container: {
        //backgroundColor: "green",
        width: "100%",
        alignItems: 'center',
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        margin: '1rem 0'
        //justifyContent: "center",
        //alignItems: "center",
    },
    twoAndThree: {
        height: 175,
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    fourToNineBackground: {
        //display: "flex",
        position: "absolute",
        //height: "50%",
        //width: "100%",
        bottom: 0,        
    },
    fourToSix: {
        height: 125,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundImage: `url(${placeFourToSixBg})`,
        backgroundSize: "100% 50%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",

    },
    sevenToNine: {
        height: 100,
        display: "flex",
        flexDirection: "row",
        backgroundImage: `url(${placeSevenToNineBg})`,
        width: "100%",
        backgroundSize: "100% 50%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
    },
    payButton: {
        width: '90%',
        marginTop: 30,
        marginBottom: 10,
    }
}