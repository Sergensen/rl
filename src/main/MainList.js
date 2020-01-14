import React, { Component } from 'react';
import First from './ListElements/First';
import Second from './ListElements/Second';
import Third from './ListElements/Third';
import ListElement from './ListElements/ListElement';
import InfoSection from './InfoSection';
import placeFourToSixBg from '../res/images/profiles/Platz4-6_Border.png'
import placeSevenToNineBg from '../res/images/profiles/Platz7-9_Border.png'
import { Button } from 'react-bootstrap';
import API from '../api';
import { motion } from "framer-motion"
import { delay } from '../Globals'
import { Spinner } from 'react-bootstrap';
import {
    isMobile
} from "react-device-detect";
import PropsListElement from './ListElements/PropsListElement';


const heightRatio = {
    propsRow: isMobile ? 0.15 : 0.175,
    firstRow: isMobile ? 0.55 : 0.5,
    secondRow: isMobile ? 0.475 : 0.4,
    thirdRow: isMobile ? 0.35 : 0.3,
    fourthRow: isMobile ? 0.3 : 0.25,
}

const list = {
    visible: {
        opacity: 1,
        transition: {
            // when: false,
            staggerChildren: delay,
            duration: 1,
            // ease: "circIn",
            // delayChildren: 0
            // delay: 0,
            // delay: 0.3,
        },
    },
    hidden: {
        opacity: 0,
    },
}

export default class MainList extends Component {

    state = {
        props: {},
        interval: null,
        localProps: {},
        width: 500,
        topThreeProps: [],
    }

    componentDidMount() {
        const { interval } = this.state;

        const width = this.imageContainer.clientWidth;
        this.setState({ width });

        if (!interval) {
            this.setState({
                interval: setInterval(this.sendProps.bind(this), 2500)
            })

            setTimeout(() => {
                clearInterval(this.state.interval);
                this.setState({
                    interval: setInterval(this.sendProps.bind(this), 7000)
                })
            }, 30000)


        };
    }

    componentDidUpdate(){
        const { data } = this.props;
        const { topThreeProps } = this.state;

        //damit er sich am Afang die top 3 holt und nicht 2.5 Sek auf den ersten Durchlauf von sendProps warten muss
        if(data.length > 0 && topThreeProps.length === 0){
            const topThreeProps = this.getTopThreeProps(data);
            this.setState({topThreeProps})
        }
    }

    async sendProps() {
        const { props } = this.state;
        const { data } = this.props;
        let temp = {};
        for (let key in data) temp[data[key].uniqueName] = 0;
        for (let key in props) temp[key] = props[key];

        let propsArr = [];
        for (let key in temp) propsArr.push({ [key]: temp[key] });

        this.setState({ props: {} });
        API.updateProps(propsArr).then(res => {
            this.mapPropsToUsers(res.props);
            // this.props.setToasts(res.toasts);
        });
    }

    mapPropsToUsers(newProps) {
        const { props } = this.state;
        const { data } = this.props;
        let out = {};

        newProps.forEach(user => out[Object.keys(user)[0]] = user[Object.keys(user)[0]]);
        for (let key in data) {
            if (out[data[key].uniqueName]) {
                data[key].props = out[data[key].uniqueName];
            }
        }

        const topThreeProps = this.getTopThreeProps(data);

        this.setState({ localProps: { ...props }, topThreeProps });
    }

    addPropsToUser(uniqueName) {
        if (uniqueName !== "") {
            const { props, localProps } = this.state;
            if (!props[uniqueName]) props[uniqueName] = 0;
            if (!localProps[uniqueName]) localProps[uniqueName] = 0;

            props[uniqueName]++;
            localProps[uniqueName]++;

            this.setState({
                props,
                localProps,
            });
        }
    }

    getTopThreeProps(data){
        console.log("topThree!!!!");       
        var topThree = [...data]
        topThree = topThree.sort((a,b) => b.props-a.props).slice(0,3);  

        return topThree;
    }

    getPropsListElements() {
        const { topThreeProps } = this.state;
        let list = [];

        for (let i = 0; i < 3; i++) {
            list.push(
                <PropsListElement position={i} user={topThreeProps[i]} style={{ ...styles.propElement, backgroundColor: "red" }}> </PropsListElement>
            );
        }

        return list;
    }

    render() {
        const { localProps, width, topThreeProps} = this.state;
        let { data } = this.props;

        data = data || {};        

        return (
            <div style={styles.main}>
                <div ref={ref => this.imageContainer = ref} style={styles.container}>
                    {data.length > 0 && topThreeProps.length > 0?
                        <motion.div initial="hidden" animate="visible" variants={list} style={styles.listContainer}>
                            <motion.div style={{ ...styles.propsTopList, height: width * heightRatio.propsRow }}>
                                {this.getPropsListElements()}
                            </motion.div>

                            <motion.div variants={list} style={{ ...styles.first, height: width * heightRatio.firstRow }}>
                                <First user={data[0]} localProps={localProps[data[0] ? data[0].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            </motion.div>

                            <motion.div variants={list} style={{ ...styles.twoAndThree, height: width * heightRatio.secondRow }}>
                                <Second user={data[1]} localProps={localProps[data[1] ? data[1].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <Third user={data[2]} localProps={localProps[data[2] ? data[2].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            </motion.div>

                            <motion.div variants={list} style={{ ...styles.fourToSix, height: width * heightRatio.thirdRow }}>
                                {/* {this.render4to6()} */}
                                <ListElement position={4} user={data[3]} localProps={localProps[data[3] ? data[3].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <ListElement position={5} user={data[4]} localProps={localProps[data[4] ? data[4].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <ListElement position={6} user={data[5]} localProps={localProps[data[5] ? data[5].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            </motion.div>

                            <motion.div variants={list} style={{ ...styles.sevenToNine, height: width * heightRatio.fourthRow }} >
                                {/* {this.render7to10()} */}
                                <ListElement position={7} user={data[6]} localProps={localProps[data[6] ? data[6].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <ListElement position={8} user={data[7]} localProps={localProps[data[7] ? data[7].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <ListElement position={9} user={data[8]} localProps={localProps[data[8] ? data[8].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <ListElement position={10} user={data[9]} localProps={localProps[data[9] ? data[9].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            </motion.div>
                        </motion.div>
                        :
                        <div style={styles.placeHolder}>
                            <Spinner animation="border" role="status" variant="light" style={styles.spinner} />
                        </div>
                    }

                    <motion.div initial={false} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95, x: "-5px", y: "5px" }} style={styles.buttonContainer}>
                        <Button onClick={() => window.location.href = '/pay'} variant="primary" size="lg" block style={styles.payButton}>
                            💸 Get on the list 💸
                        </Button>
                    </motion.div>

                    <div style={styles.InfoSection}>
                        <InfoSection />
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
        backgroundColor: "rgba(0, 0, 0, 0.4)",
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
        margin: '1rem 0',
        //justifyContent: "center",
        //alignItems: "center",
    },
    placeHolder: {
        width: "100%",
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    spinner: {
        width: 150,
        height: 150,
    },
    listContainer: {
        width: "100%",
        alignItems: 'center',
        display: "flex",
        flexDirection: "column",
    },
    first: {
        width: "100%",
        alignItems: 'center',
        display: "flex",
    },
    InfoSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '1vh',
        paddingBottom: '1vh',
        // backgroundColor: 'rgba(0,0,0,0.4)',
    },
    twoAndThree: {
        // height: 175,
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
        // height: 125,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundImage: `url(${placeFourToSixBg})`,
        backgroundSize: "100% 50%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",

    },
    sevenToNine: {
        // height: 100,
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
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    propsTopList: {
        width: "100%",
        display: "flex",
        // alignItems: "center",
        // flexDirection: "center",        
    },
    propElement: {
        display: "flex",
        // height: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "left",
        flexDirection: "center",

    },

}