import React, { Component } from 'react';
import First from './ListElements/First';
import Second from './ListElements/Second';
import Third from './ListElements/Third';
import ListElement from './ListElements/ListElement';
import placeFourToSixBg from '../res/images/profiles/Platz4-6_Border.png'
import placeSevenToNineBg from '../res/images/profiles/Platz7-9_Border.png'



export default class MainList extends Component {
    state = {

    }

    componentDidMount() {

    }


    render() {
        return (
            <div style={styles.main}>

                <div style={styles.container}>
                    <First />

                    <div style={styles.twoAndThree}>
                        <Second />
                        <Third />
                    </div>

                    <div style={styles.fourToSix}>
                        {/* {this.render4to6()} */}
                        <ListElement />
                        <ListElement />
                        <ListElement />
                    </div>

                    <div style={styles.sevenToNine} >
                        {/* {this.render7to10()} */}
                        <ListElement />
                        <ListElement />
                        <ListElement />
                        <ListElement />
                    </div>

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
        //backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        flex: 1,
    },
    container: {
        //backgroundColor: "green",
        width: "100%",
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        //alignItems: "center",
    },
    twoAndThree: {
        height: 175,
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
        height: 150,
        display: "flex",
        flexDirection: "row",
        backgroundImage: `url(${placeFourToSixBg})`,
        backgroundSize: "auto 50%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",

    },
    sevenToNine: {
        height: 125,
        display: "flex",
        flexDirection: "row",
        backgroundImage: `url(${placeSevenToNineBg})`,
        backgroundSize: "auto 50%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
    },

}