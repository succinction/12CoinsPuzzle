import React from 'react';

function Feather({ id, my_index, label }) {
    return (
        <div className="feather" id={id} >
            {label && <div id="feather-label" > Light </div>}
            <img id={"fe" + my_index} src="coin_images/white_feather.png" alt="" />
        </div>
    );

}

export default Feather;





