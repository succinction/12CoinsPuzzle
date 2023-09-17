import React, { Component } from 'react';
import { Power3, gsap } from "gsap";

class Nav extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const nav_id = ["#restart_btn", "#label_btn", "#cheat_btn", "#replace_btn", "#coins_3_btn", "#coins_6_btn", "#coins_9_btn", "#coins_10_btn", "#coins_11_btn", "#coins_12_btn", "#coins_13_btn", "#coins_14_btn", "#coins_15_btn"];
        const tl = gsap.timeline({
            delay: .3,
            defaults: { 
                duration: .68,
                stagger: .1,
                ease: Power3.easeOut, 
                autoAlpha: 1
            },
        });
        tl.fromTo(nav_id, { y: -30 }, { y: 0 }, "-=0.7")
        tl.play()
    }
    render() {
        return (
            <div className="nav">
                <button id="restart_btn" className="btn" onClick={this.props.reset_fn}>Restart</button>
                <button id="label_btn" className="btn" onClick={this.props.label_fn}>Labels</button>
                <button id="cheat_btn" className="btn" onClick={this.props.cheat_fn}>Cheat</button>
                <button id="replace_btn" className="btn" onClick={this.props.replace_fn}>Replace</button>
                <button id="coins_3_btn" className="btn" onClick={this.props.coins_3_fn}>3</button>
                <button id="coins_6_btn" className="btn" onClick={this.props.coins_6_fn}>6</button>
                <button id="coins_9_btn" className="btn" onClick={this.props.coins_9_fn}>9</button>
                <button id="coins_10_btn" className="btn" onClick={this.props.coins_10_fn}>10</button>
                <button id="coins_11_btn" className="btn" onClick={this.props.coins_11_fn}>11</button>
                <button id="coins_12_btn" className="btn" onClick={this.props.coins_12_fn}>12</button>
                <button id="coins_13_btn" className="btn" onClick={this.props.coins_13_fn}>13</button>
                <button id="coins_14_btn" className="btn" onClick={this.props.coins_14_fn}>14</button>
                <button id="coins_15_btn" className="btn" onClick={this.props.coins_15_fn}>15</button>
            </div>
        );
    }
}

export default Nav;
