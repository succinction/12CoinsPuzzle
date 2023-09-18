import React, { Component } from 'react';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.func = this.props.login_fn;
        this.loadGame = () => {
            let gameIDin = document.getElementById('gameIdInput').value || this.props.player_name;
            let PINin = document.getElementById('pin').value || this.props.pin;
            this.func(gameIDin, PINin)
        }
    }
    render() {
        return (
            <div id="controls">
                CHANGE NAME to claim stats:
                <input type="text" name="gameID" id="gameIdInput" placeholder={this.props.player_name} />
                PIN:
                <input type="number" name="gameID" id="pin" placeholder={this.props.pin != -1 ? this.props.pin : ""}  />
                {/* <input type="number" name="gameID" id="pin"   /> */}
                <button id="load" className="btn" onClick={this.loadGame}> CHANGE </button>
                <br />

                Player: {this.props.player_name}  
                {/* Game Number: {this.props.lastGame} | */}
                {/* <strong> {measure_num} </strong> */}
                {/* <button id="backwards" className="btn" onClick={this.props.backwards_fn}> back </button> | */}
                {/* <button id="forwards" className="btn" onClick={this.props.forwards_fn}> next </button> */}
            </div>
        );
    }
}

export default Controls;
