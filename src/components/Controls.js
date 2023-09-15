import React, { Component } from 'react';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.func = this.props.login_fn;
        this.loadGame = () => {
            let gameIDin = document.getElementById('gameIdInput').value;
            this.func(gameIDin)
        }
    }
    render() {
        return (
            <div id="controls">
                CHANGE NAME to Claim Stats:
                <input type="text" name="gameID" id="gameIdInput" />
                <button id="load" className="btn" onClick={this.loadGame}> CHANGE </button>
                <br />

                Player: {this.props.player_name}  |
                Game Number: {this.props.lastGame} |
                {/* <strong> {measure_num} </strong> */}
                {/* <button id="backwards" className="btn" onClick={this.props.backwards_fn}> back </button> | */}
                {/* <button id="forwards" className="btn" onClick={this.props.forwards_fn}> next </button> */}
            </div>
        );
    }
}

export default Controls;
