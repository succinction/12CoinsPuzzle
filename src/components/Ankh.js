import React from 'react';

function Ankh({ id, my_index, label }) {
    return (
        <div className="ankh" id={id}>
            {label && <div id="ankh-label" > Heavy </div>}
            <img id={"nk" + my_index} src="coin_images/ankh.png" alt="" />
        </div>
    );
}

export default Ankh;





