import React from 'react';
import scale_icon from './scale_svg/scale_icon.svg';

export default function Message(props) {
    return (
        <p className="messenger" id="messenger">
            <span className="title" >{props.num} Coins & Scale</span>
            <img className="scale_icon" id="scale_icon0" src={scale_icon} alt="" />
            <img className="scale_icon" id="scale_icon1" src={scale_icon} alt="" />
            <img className="scale_icon" id="scale_icon2" src={scale_icon} alt="" />
               &nbsp;    {props.msg}
        </p>
    );
}
