import React, { Component } from 'react';
import First from './ListElements/First';
import Second from './ListElements/Second';
import Third from './ListElements/Third';
import ListElement from './ListElements/ListElement';
import InfoSection from './InfoSection';
import placeFourToSixBg from '../res/images/profiles/Platz4-6_Border.png'
import placeSevenToNineBg from '../res/images/profiles/Platz7-9_Border.png'
import { Button, Card } from 'react-bootstrap';
import API from '../api';
import { motion } from "framer-motion"
import { delay } from '../Globals'
import { Spinner } from 'react-bootstrap';
import {
    isMobile
} from "react-device-detect";
import PropsListElement from './ListElements/PropsListElement';
import InstagramEmbed from 'react-instagram-embed';
import HeartImageRed from '../res/images/profiles/heart_red.png'

const heightRatio = {
    propsRow: isMobile ? 0.375 : 0.3,
    firstRow: isMobile ? 0.55 : 0.5,
    secondRow: isMobile ? 0.475 : 0.4,
    thirdRow: isMobile ? 0.35 : 0.3,
    fourthRow: isMobile ? 0.3 : 0.25,
}

const propsListHeartAndTextsize = isMobile ? window.innerHeight * 0.035 : window.innerHeight * 0.025;

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
        onlineUserCount: 0,
    }

    componentDidMount() {
        const { interval } = this.state;
        console.log("lawllawl123");

        const width = this.imageContainer.clientWidth;
        this.setState({ width });

        if (!interval) {
            this.setState({
                interval: setInterval(this.sendProps.bind(this), 3000)
            })

            setTimeout(() => {
                clearInterval(this.state.interval);
                this.setState({
                    interval: setInterval(this.sendProps.bind(this), 7000)
                })
            }, 30000)


        };
    }

    componentDidUpdate() {
        const { data } = this.props;
        const { topThreeProps } = this.state;

        //damit er sich am Afang die top 3 holt und nicht 2.5 Sek auf den ersten Durchlauf von sendProps warten muss
        if (data.length > 0 && topThreeProps.length === 0) {
            const topThreeProps = this.getTopThreeProps(data);
            this.setState({ topThreeProps })
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
        const onlineUserCount = await API.getOnline();

        API.updateProps(propsArr).then(res => {
            this.mapPropsToUsers(res.props, onlineUserCount);
            // this.props.setToasts(res.toasts);
        });
    }

    mapPropsToUsers(newProps, onlineUserCount) {
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

        this.setState({ localProps: { ...props }, topThreeProps, onlineUserCount });
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

    getTopThreeProps(data) {
        var topThree = [...data]
        topThree = topThree.sort((a, b) => b.props - a.props).slice(0, 3);

        return topThree;
    }

    getPropsListElements() {
        const { topThreeProps } = this.state;
        let list = [];

        for (let i = 0; i < 3; i++) {
            list.push(
                <PropsListElement key={i} position={i} user={topThreeProps[i]} style={{ ...styles.propElement }}> </PropsListElement>
            );
        }

        return list;
    }

    render() {
        const { localProps, width, topThreeProps, onlineUserCount } = this.state;
        let { data } = this.props;

        data = data || {};

        const dataIsLoaded = data.length > 0 && topThreeProps.length > 0;

        return (
            <div style={styles.main}>
                <div ref={ref => this.imageContainer = ref} style={styles.container}>
                    <div style={styles.headerContainer}>
                        <div style={{ ...styles.headerlineContainer, transform: "rotate(180deg)" }}>
                            <hr style={styles.headerDividingLine} />
                        </div>
                        <div style={{ ...styles.headerText, fontSize: propsListHeartAndTextsize * 0.9, fontWeight: "bold" }}>
                            Pay money to get on the list
                                </div>
                        <div style={styles.headerlineContainer}>
                            <hr style={styles.headerDividingLine} />
                        </div>
                    </div>
                    {dataIsLoaded ?
                        <motion.div initial="hidden" animate="visible" variants={list} style={styles.listContainer}>
                            {/* <div style={{...styles.headerText, fontSize: propsListHeartAndTextsize * 0.9 }}>{onlineUserCount} users online </div> */}
                            <motion.div variants={list} style={{ ...styles.first, height: width * heightRatio.firstRow }}>
                                <First user={data[0]} localProps={localProps[data[0] ? data[0].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            </motion.div>

                            <motion.div variants={list} style={{ ...styles.twoAndThree, height: width * heightRatio.secondRow }}>
                                <Second user={data[1]} localProps={localProps[data[1] ? data[1].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <Third user={data[2]} localProps={localProps[data[2] ? data[2].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            </motion.div>

                            <motion.div variants={list} style={{ ...styles.fourToSix, height: width * heightRatio.thirdRow }}>
                                <ListElement position={4} user={data[3]} localProps={localProps[data[3] ? data[3].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <ListElement position={5} user={data[4]} localProps={localProps[data[4] ? data[4].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                                <ListElement position={6} user={data[5]} localProps={localProps[data[5] ? data[5].uniqueName : null]} addPropsToUser={this.addPropsToUser.bind(this)} />
                            </motion.div>

                            <motion.div variants={list} style={{ ...styles.sevenToNine, height: width * heightRatio.fourthRow }} >
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

                    <hr style={styles.dividingLine} />

                    <motion.div initial={false} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95, x: "-5px", y: "5px" }} style={styles.buttonContainer}>
                        <Button onClick={() => window.location.href = '/pay'} variant="primary" size="lg" block style={styles.payButton}>
                            💸 Get on the list 💸
                        </Button>
                    </motion.div>

                    {dataIsLoaded && <div style={{ ...styles.headerText, fontSize: propsListHeartAndTextsize *0.8 }}><div style={{ fontWeight: "bold" }}> {onlineUserCount}</div>&nbsp;users online will see your payment!</div>}


                    {dataIsLoaded && <hr style={styles.dividingLine} />}

                    {dataIsLoaded ?
                        <motion.div style={{ ...styles.propsTopListContainer }}>
                            <div style={styles.propsListHeader}>
                                <img style={{ ...styles.heartImage, width: propsListHeartAndTextsize, height: propsListHeartAndTextsize }} src={HeartImageRed} />
                                Most liked members
                                <img style={{ ...styles.heartImage, width: propsListHeartAndTextsize, height: propsListHeartAndTextsize }} src={HeartImageRed} />
                            </div>
                            <div style={{ ...styles.propsTopList, height: width * heightRatio.propsRow }}>
                                {this.getPropsListElements()}
                            </div>
                        </motion.div>
                        :
                        <div> </div>
                    }

                    <hr style={styles.dividingLine} />

                    <div style={styles.InfoSection}>
                        <InfoSection />
                    </div>

                    <hr style={styles.dividingLine} />

                    <div style={{ ...styles.headerText, fontSize: propsListHeartAndTextsize, fontWeight: "bold", marginBottom: 10 }}><a href="https://www.instagram.com/richlist2020/" style={{ color: "white", default: "default", textDecoration: "none" }}> Instagram</a></div>

                    <InstagramEmbed
                        url='https://www.instagram.com/p/B6qloZ5oDxJ/'
                        maxWidth={320}
                        hideCaption={true}
                        containerTagName='div'
                    />

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
        // margin: '1rem 0',
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
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        width: "100%"
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        display: "flex",
        whiteSpace: "nowrap",
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
    },
    headerlineContainer: {
        display: "flex",
        flex: 1,
    },
    headerDividingLine: {
        background: "linear-gradient(to right, rgba(150, 150, 150, 1), rgba(150, 150, 150, 1), rgba(150, 150, 150, 0))",
        height: 1,
        width: "95%"
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
        // paddingTop: '1vh',
        // paddingBottom: '1vh',
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
        marginTop: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    propsTopListContainer: {
        width: "100%",
        // height: "100%",
        // display: "flex",
        // alignItems: "center",
        // flexDirection: "center",        
    },
    propsTopList: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        // flexDirection: "flex-end",        
    },
    propsListHeader: {
        // display: "flex",
        color: 'white',
        fontSize: propsListHeartAndTextsize,
        // padding: '1%',
        // maxWidth: 900,
        // width: '100%',
        // margin: '1%',
        textAlign: 'center',
        fontWeight: "bold",
        //border: '1px solid grey',
        //borderWidth: '1px 0 1px 0',
        //backgroundColor: 'black'
        marginBottom: "3%",
    },
    propElement: {
        // display: "flex",
        height: "100%",
        // flex: 1,
        flexDirection: "row",
        alignItems: "left",
        flexDirection: "center",
    },
    card: {
        // minWidth: 300,
        // width: "96%", 
        margin: "2%",
        backgroundColor: "black",
        borderColor: "darkgrey",
        color: "white"
    },
    stretchedLink: {
        height: "100%",
        width: "100%",
        color: "white",
    },
    dividingLine: {
        background: "linear-gradient(to right, rgba(150, 150, 150, 0), rgba(150, 150, 150, 1), rgba(150, 150, 150, 0))",
        height: 1,
        width: "95%"
    },
    placeHolderPropsList: {
        width: "100%",
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    spinnerPropsList: {
        width: 50,
        height: 50,
    },
    heartImage: {
        marginLeft: "2%",
        marginRight: "2%",
        marginBottom: "1%"
    }



}