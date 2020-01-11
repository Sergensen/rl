import React, { Component } from 'react';
import First from './ListElements/First';
import Second from './ListElements/Second';
import Third from './ListElements/Third';
import ListElement from './ListElements/ListElement';
import placeFourToSixBg from '../res/images/profiles/Platz4-6_Border.png'
import placeSevenToNineBg from '../res/images/profiles/Platz7-9_Border.png'
import { Button } from 'react-bootstrap';
import API from '../api';
import { motion } from "framer-motion"
import { delay } from '../Globals'

export default class MainList extends Component {

    state = {
        props: {},
        interval: null,
        localProps: {},
    }

    componentDidMount() {
        const { interval } = this.state;
        if (!interval) {
            //TODO: längeren Intervall machen
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

    async sendProps() {
        console.log("sendProps: " + new Date())
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

        this.setState({ localProps: { ...props } });
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

    render() {
        const { localProps } = this.state;
        let { data } = this.props;

        data = data || {};

        const list = {
            visible: {
                opacity: 1,
                transition: {
                    when: "beforeChildren",
                    staggerChildren: delay,
                    duration: 0.7,
                    ease: "circIn",
                    // delay: 0.3,
                },
            },
            hidden: {
                opacity: 0,
            },
        }

        return (
            <div style={styles.main}>
                <div style={styles.container}>
                    <motion.div initial="hidden" animate="visible" variants={list} style={styles.listContainer}>
                        <motion.div variants={list} style={styles.first}>
                            <First user={data[0]} localProps={localProps[data[0] ? data[0].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                        </motion.div>

                        <motion.div variants={list} style={styles.twoAndThree}>
                            <Second user={data[1]} localProps={localProps[data[1] ? data[1].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            <Third user={data[2]} localProps={localProps[data[2] ? data[2].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                        </motion.div>

                        <motion.div variants={list} style={styles.fourToSix}>
                            {/* {this.render4to6()} */}
                            <ListElement position={3} user={data[3]} localProps={localProps[data[3] ? data[3].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            <ListElement position={4} user={data[4]} localProps={localProps[data[4] ? data[4].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            <ListElement position={5} user={data[5]} localProps={localProps[data[5] ? data[5].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                        </motion.div>

                        <motion.div variants={list} style={styles.sevenToNine} >
                            {/* {this.render7to10()} */}
                            <ListElement position={6} user={data[6]} localProps={localProps[data[6] ? data[6].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            <ListElement position={7} user={data[7]} localProps={localProps[data[7] ? data[7].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            <ListElement position={8} user={data[8]} localProps={localProps[data[8] ? data[8].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            <ListElement position={9} user={data[9]} localProps={localProps[data[9] ? data[9].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                        </motion.div>
                    </motion.div>

                    <motion.div initial={false} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95, x: "-5px", y: "5px" }} style={styles.buttonContainer}>
                        <Button onClick={() => window.location.href = '/pay'} variant="primary" size="lg" block style={styles.payButton}>
                            💸 Get on the list 💸
                        </Button>
                    </motion.div>

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
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }
}