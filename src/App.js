import React, { Component } from 'react';
import './App.css';
import Coins from './components/Coins'
import Nav from './components/Nav'
import Bg from './components/Bg'
import Instructions from './components/Instructions'
import Message from './components/Message'
import Body from './components/Body';
import Scale from './components/Scale'
import Timer from './components/Timer';
import { gsap, Power3 } from 'gsap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Controls from "./components/Controls";

class App extends Component {
    constructor(props) {
        super(props);

        const landscapeQuery = window.matchMedia("(orientation: landscape)");
        const mobileResponsiveness = () => {
            if (window.innerWidth < 850) {
                const viewportMetaTag = document.querySelector('meta[name="viewport"]');
                if (viewportMetaTag) {
                    const thislandscapeQuery = window.matchMedia("(orientation: landscape)");
                    if (thislandscapeQuery.matches) {
                        viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.64');
                    } else {
                        viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.42');
                    }
                }
            }
        }

        if (landscapeQuery.addEventListener) {
            landscapeQuery.addEventListener("change", function (event) {
                mobileResponsiveness()
            });
        } else if (landscapeQuery.addListener) {
            // Safari uses addListener instead of addEventListener
            landscapeQuery.addListener(function (event) {
                mobileResponsiveness()
            });
        }

        mobileResponsiveness()
        window.addEventListener("resize", mobileResponsiveness);

        this.getNewGameNumber = () => {
            const event = new Date(Date.now());
            let idPrefix = event.toISOString().substring(0, 10)
            idPrefix = idPrefix.replaceAll("-","")
            return idPrefix + uuidv4();
        }
        this.gameNumber = this.getNewGameNumber();
        const initialNumberOfCoins = Number(localStorage.getItem("initialNumberOfCoins")) || 9;
        localStorage.setItem("initialNumberOfCoins", initialNumberOfCoins);
        const initialLabels = Boolean(Number(localStorage.getItem("initialLabels")) == 1);
        localStorage.setItem("initialLabels", initialLabels ? 1 : 0);
        const PIN = Number(localStorage.getItem("PIN")) || -1;
        localStorage.setItem("PIN", PIN);
        this.showLabels = !initialLabels;
        this.numberOfCoins = initialNumberOfCoins;
        this.lucky_number = Math.floor(Math.random() * initialNumberOfCoins);
        this.coin_weights = [Number(6), Number(5), Number(7)];
        this.measurementsUsed = 0;
        this.readout = "Find the false coin within three measurements.";
        this.light_or_heavy = Math.floor(Math.random() * 2) + 1;
        this.pin = PIN;

        this.getUserName = (response_name, pin) => {
            // console.log("response_name", response_name)
            if (pin) {
                this.pin = pin
                localStorage.setItem("PIN", pin);
            }
            let name = localStorage.getItem("name");
            if (name === null || name === "null" || name === "undefined" || name === undefined) {
                name = 'guest' + Math.round(Math.random() * 100000);
                this.userName = name;
                localStorage.setItem("name", name);
            }
            if (response_name !== null && response_name !== undefined) {
                if (typeof response_name === "string" && response_name !== name) {
                    console.log("new _name", response_name)
                    name = response_name;
                    this.userName = name;
                    this.setState({
                        userName: this.userName
                    })
                }
            }
            localStorage.setItem("name", name);
            return name
        };

        this.userName = this.getUserName(null);
        this.lastSavedGame = 0;
        this.state = {
            gameNumber: this.gameNumber,
            userName: this.userName,
            replayObject: [],
            rePlayMode: false,
            lastSavedGame: 0,
            labels: !initialLabels,
            msg: this.readout,
            numberOfCoins: this.numberOfCoins,
            balanced: 0
        };
        document.onselectstart = function () {
            return false;
        };
        document.body.setAttribute('unselectable', 'on', 0);
        this.cheated = false;
        this.gameSaved = "0";
        this.rePlayMode = false;
        this.renew_game_object = () => {
            let sign = (this.light_or_heavy > 1) ? "+" : "-";
            return {
                userName: this.userName,
                gameNumber: this.gameNumber,
                gameType: this.state.numberOfCoins,
                falseCoin: this.lucky_number + sign,
                numberOfMeasurements: 0,
                finalTime: 0,
                measurements: []
            }
        };
        this.reset_location_array = (num) => {
            let numb = (num > 0) ? num : this.state.numberOfCoins;
            let arr = [0, 0];
            for (let i = 0; i < numb; i++) {
                arr.push(0);
            }
            return arr
        };
        this.coin_location_array = this.reset_location_array();
        this.coin_locations = this.coin_location_array.toString();
        this.colr = { h: 0, s: 50, l: 80 };
        this.element = document.getElementsByTagName("body")[0];
        this.gameObject = this.renew_game_object();
    }

    applyColor = () => {
        this.element.style.backgroundColor = "hsl(" + this.colr.h + "," + this.colr.s + "%," + this.colr.l + "%)";
    };
    end_color = () => {
        gsap.to(this.colr, { duration: 6, h: 0, s: 0, l: 20, onUpdate: this.applyColor });
    };
    updateGameObject = () => {
        let measuretime = this._child_timer.get_time();
        const ankh_xy = [gsap.getProperty("#ankh", "x"), gsap.getProperty("#ankh", "y")]
        const feather_xy = [gsap.getProperty("#feather", "x"), gsap.getProperty("#feather", "y")]
        let push_position = { 'time': measuretime, 'ankh': ankh_xy, 'feather': feather_xy };
        for (let i = this.state.numberOfCoins - 1; i >= 0; i--) {
            const coin_xy = [gsap.getProperty(`#${'coin' + i}`, "x"), gsap.getProperty(`#${'coin' + i}`, "y")];
            push_position['coin' + i] = coin_xy;
        }
        this.gameObject.numberOfMeasurements = this.measurementsUsed;
        this.gameObject.finalTime = measuretime;
        this.gameObject.gameType = this.state.numberOfCoins;
        this.gameObject.measurements.push(push_position);
    };

    //////////////////////////////////////////////////////////////////////////////////////
    // POTENTIAL DEVELOPMENT
    // REPLAY OBJECT:
    // PLAYER NAME
    // GAME NUMBER
    // DATE
    // MEASUREMENTS
    // REPLAY MODE

    enterReplay = (gameID) => {
        // // console.log('enterReplay: ', gameID);
        // // INTRO REPLAY CONTROLS
        // // let replay = () => {
        // //     this.rePlayMode = true;
        // // };
        // let saveState = (data_user, data_id, response_data) => {
        //     this.setState({
        //         userName: data_user,
        //         lastSavedGame: data_id,
        //         rePlayMode: true,
        //         replayObject: response_data
        //     });
        // };
        // // LOAD GAME
        // axios({
        //     method: 'get',
        //     headers: { 'Content-Type': 'application/json' },
        //     // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //     url: 'http://127.0.0.1:8000/api/game/' + gameID
        //     // data: dat

        // }).then(function (response) {
        //     console.log("response", response)
        //     let responsedata = JSON.parse(response.data);
        //     console.log("responsedata", responsedata)
        //     saveState(response.data.user, response.data.id, responsedata)
        // });
    };
    backward_replay = () => {
        console.log('backward_replay');
        console.log(this.state.replayObject[0])
    };
    forward_replay = () => {
        console.log('forward_replay');
        console.log(this.state.replayObject[1])
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //  SAVE GAMEOBJECT
    saveGameObject = (used, time, score, dur) => {
        console.log(">", this.gameSaved === this.gameObject.gameNumber ? "Block" : "Save")
        console.log(this.gameSaved, "prev saved")
        if (this.gameSaved === this.gameObject.gameNumber) {
            return;
        }
        console.log(this.gameObject.gameNumber, "saving")
        let change_name = (arg) => {
            // console.log(arg);
            if (this.userName !== arg) {
                this.getUserName(arg)
                this.userName = arg;
                this.gameObject.userName = arg;
            }
        };
        let SavedGame = (gameID, argname) => {
            if (this.state.userName !== argname) {
                this.setState({
                    userName: argname,
                    lastSavedGame: gameID
                });
                this.getUserName(argname)
            } else {
                this.setState({
                    lastSavedGame: gameID
                });
            }
        };
        let cheated = (this.cheated) ? 'True' : 'False';
        let scoretime = (this.cheated) ? time + "-Tilted" : time;
        let thescore = (this.cheated) ? 0 : score;
        // console.log('pin', this.pin)
        let dat = (
            {
                user: this.state.userName,
                won: thescore,
                duration: dur,
                cheat: cheated,
                gameNumber: String(this.gameObject.gameNumber),
                gameType: this.gameObject.gameType,
                numberOfMeasurements: used,
                finalTime: scoretime,
                falseCoin: this.gameObject.falseCoin,
                measurements: JSON.stringify(this.gameObject.measurements),
                pin: this.pin
            }
        );

        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post('https://hp5yhcm10f.execute-api.us-west-2.amazonaws.com/neo/coins_savegame', {
            data: dat
        }, { headers }
        ).then((response) => {
            // console.log("response", response)
            change_name(response.data.user);
            // SavedGame(response.data.gameID, response.data.newGuest)
            SavedGame(this.state.lastSavedGame + 1, this.state.userName)
        }).catch(error => {
            console.log("error:", error)

        });
        this.gameSaved = this.gameObject.gameNumber
    };

    reset_game = (numbr) => {
        if (this.measurementsUsed >= 3) {
            const time = this._child_timer.get_time();
            const duration = this._child_timer.get_seconds();
            this.saveGameObject(this.measurementsUsed, time, 0, duration);
        }
        if (typeof (numbr) !== "number") {
            numbr = this.state.numberOfCoins
        }
        let lucky_number_init = -1;
        this.cheated = false;
        this._child_timer.reset_time();
        if (typeof (numbr) === "number") {
            lucky_number_init = Math.floor(Math.random() * numbr);
        } else {
            lucky_number_init = Math.floor(Math.random() * this.state.numberOfCoins);
        }
        this.measurementsUsed = 0;
        this.readout = "Find the false coin within three measurements.";
        this.lucky_number = lucky_number_init;
        this.light_or_heavy = Math.floor(Math.random() * 2) + 1;
        this.gameNumber = this.getNewGameNumber();
        let icons = ["#scale_icon0", "#scale_icon1", "#scale_icon2"];
        gsap.to(icons, { duration: .5, autoAlpha: 1, ease: Power3.easeOut });
        gsap.to("#cheat_btn", { duration: 2, color: "hsl(0, 0%, 100%)" });
        gsap.to("#messenger", { duration: 2, color: "#90BCF0" });
        this.setState({
            numberOfCoins: numbr,
            gameNumber: this.gameNumber,
            msg: this.readout,
        });
        localStorage.setItem("initialNumberOfCoins", numbr)
        this.reset_coins(numbr);
        this.gameObject = this.renew_game_object();
    };
    replace_coins = () => {
        this._child.replace_coins();
        this.reset_coins()
    };
    reset_coins = (num) => {
        // this.readout = this.coin_locations;
        this.coin_location_array = this.reset_location_array(num);
        this.coin_locations = this.coin_location_array.toString();
        // this.readout += " : " + this.coin_locations;
        this.setState({
            // msg: this.readout,
            balanced: 0
        });
    }
    balance_scale = (tc) => {
        let balance_mod = 0;
        if (tc.clientY < 428) {
            let offset = window.innerWidth / 2;
            balance_mod = (tc.clientX < offset) ? 1 : -1;
        } else if (tc.changedTouches && tc.changedTouches[0].clientY < ((window.screen.height > 428) ? 428 : window.screen.height - 100)) {
            let offset = window.screen.width / 2;
            balance_mod = (tc.changedTouches[0].clientX < offset) ? 1 : -1;
        } else {
            balance_mod = 0;
        }
        let balanced = 0;
        let indexx = Number(tc.target.id.substr(2));
        this.coin_location_array[indexx] = balance_mod;
        let coins_on_scale_now = 0;
        let measurement_constituted = 0;
        for (let i = 0; i < this.coin_location_array.length; i++) {
            coins_on_scale_now += Math.abs(this.coin_location_array[i]);
            measurement_constituted += this.coin_location_array[i];
        }
        if (measurement_constituted === 0) {
            // show lucky
            for (let i = 0; i < this.coin_location_array.length; i++) {
                if (i === this.lucky_number) {
                    balanced += this.coin_location_array[i] * this.coin_weights[this.light_or_heavy];
                } else if (i === this.coin_location_array.length - 2) {
                    balanced += this.coin_location_array[i] * this.coin_weights[1];
                } else if (i === this.coin_location_array.length - 1) {
                    balanced += this.coin_location_array[i] * this.coin_weights[2];
                } else {
                    balanced += this.coin_location_array[i] * this.coin_weights[0];
                }
            }
        } else {
            // hide lucky
            for (let i = 0; i < this.coin_location_array.length; i++) {
                if (i === this.coin_location_array.length - 2) {
                    balanced += this.coin_location_array[i] * this.coin_weights[1];
                } else if (i === this.coin_location_array.length - 1) {
                    balanced += this.coin_location_array[i] * this.coin_weights[2];
                } else {
                    balanced += this.coin_location_array[i] * this.coin_weights[0];
                }
            }
        }
        this.setState({
            balanced: balanced,
            msg: Number(tc.target.id.substr(2)) + " clientX: " + tc.clientX
        });
        this.score(measurement_constituted, coins_on_scale_now, balanced)
    };
    score = (measurement_constituted, coins_on_scale_now, balanced) => {
        let time = this._child_timer.get_time();
        let duration = this._child_timer.get_seconds();
        let number_of_coins = this.state.numberOfCoins;
        let coin_locations_now = this.coin_location_array.toString();
        if (measurement_constituted === 0 && coins_on_scale_now > 0 && this.coin_locations !== coin_locations_now) {
            // SCALE BALANCED, SO UPDATE GAMEOBJECT
            this.updateGameObject();
            if ((Math.abs(this.coin_location_array[number_of_coins]) === 1 || Math.abs(this.coin_location_array[number_of_coins + 1]) === 1) && coins_on_scale_now === 2) {
                if (balanced === 0) {
                    if (this.measurementsUsed < 3) {
                        gsap.to(this.colr, {
                            duration: 1,
                            h: -360,
                            l: 50,
                            onUpdate: this.applyColor,
                            onComplete: this.end_color,
                            yoyo: true,
                            repeat: 2
                        });
                        this.readout = 'You Win! ' + number_of_coins + ' Coins in ' + this.measurementsUsed + ' of 3 measurements! ' + time;
                        this.saveGameObject(this.measurementsUsed, time, 1, duration);
                    } else if (this.measurementsUsed < 4) {
                        gsap.to(this.colr, {
                            duration: 4,
                            h: 360,
                            l: 50,
                            onUpdate: this.applyColor,
                            onComplete: this.end_color,
                            yoyo: true,
                            repeat: 2
                        });
                        this.readout = 'You Win! ' + number_of_coins + ' Coins in ' + this.measurementsUsed + ' of 3 measurements! ' + time;

                        this.saveGameObject(this.measurementsUsed, time, 1, duration);
                    } else {
                        this.readout = 'Correct, but it took you ' + this.measurementsUsed + ' of 3 measurements. ' + time;
                        this.saveGameObject(this.measurementsUsed, time, 0, duration);
                        if (this.measurementsUsed === 4) {
                        }
                    }
                } else {
                    this.measurementsUsed++;
                    this.readout = 'Oops. Wrong. ' + this.measurementsUsed + ' of 3 measurements used. ' + time;
                    gsap.to("#scale_icon" + (this.measurementsUsed - 1), {
                        duration: .5,
                        autoAlpha: 0.2,
                        ease: Power3.easeOut
                    });
                }
            } else {
                this.measurementsUsed++;
                this.readout = this.measurementsUsed + ' of 3 measurements used.';
                gsap.to("#scale_icon" + (this.measurementsUsed - 1), { duration: .5, autoAlpha: 0.2, ease: Power3.easeOut });
            }
        }
        this.coin_locations = coin_locations_now;
        this.setState({
            msg: this.readout
        })
    };
    show_cheat = () => {
        let lucky_label = ("#coin" + this.lucky_number);
        gsap.to(lucky_label, { duration: .4, y: "-=30" });
        gsap.to(["#messenger", "#cheat_btn"], { duration: 2, color: "hsl(0, 80%, 60%)" });
        this.cheated = true;
    };
    coins_3 = () => { this.reset_game(3) };
    coins_6 = () => { this.reset_game(6) };
    coins_7 = () => { this.reset_game(7) };
    coins_8 = () => { this.reset_game(8) };
    coins_9 = () => { this.reset_game(9) };
    coins_10 = () => { this.reset_game(10) };
    coins_11 = () => { this.reset_game(11) };
    coins_12 = () => { this.reset_game(12) };
    coins_13 = () => { this.reset_game(13) };
    coins_14 = () => { this.reset_game(14) };
    coins_15 = () => { this.reset_game(15) };
    toggle_labels = () => {
        localStorage.setItem("initialLabels", !this.state.labels ? 0 : 1)
        this.setState({
            labels: !this.state.labels
        });
    };

    render() {
        return (
            <div className="App" id="app_id">
                <Bg />
                <Scale balanced={this.state.balanced} />
                <Timer ref={(child) => this._child_timer = child} />
                <Instructions />
                <Message msg={this.state.msg} className="messenger" id="messenger" num={this.state.numberOfCoins} />
                <Nav className="nav" coins_3_fn={this.coins_3} coins_6_fn={this.coins_6} coins_9_fn={this.coins_9} coins_8_fn={this.coins_8}
                    coins_10_fn={this.coins_10} coins_11_fn={this.coins_11} coins_12_fn={this.coins_12} coins_7_fn={this.coins_7}
                    coins_13_fn={this.coins_13} coins_14_fn={this.coins_14} coins_15_fn={this.coins_15}
                    replace_fn={this.replace_coins} reset_fn={this.reset_game} cheat_fn={this.show_cheat}
                    label_fn={this.toggle_labels} />
                <Coins ref={(child) => this._child = child} gameNumber={this.state.gameNumber} numberOfCoins={this.state.numberOfCoins}
                    label={this.state.labels} balance_func={this.balance_scale} resetgame_fn={this.reset_game} />
                {/* <Controls lastGame={this.state.lastSavedGame} player_name={this.state.userName} pin={this.pin}
                    backwards_fn={this.backward_replay} forwards_fn={this.forward_replay}
                    load_fn={this.enterReplay} login_fn={this.getUserName} /> */}
                <Body user_name={this.state.userName} last_game={this.state.lastSavedGame} getUserNameFn={this.getUserName} />
            </div>
        );
    }
}

export default App;
