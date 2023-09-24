function ClaimUserName({ player_name, pin, getUserNameFn }) {
    const updateUserName = () => {
        let gameIDin = document.getElementById('userNameInput').value || player_name;
        // let PINin = document.getElementById('pin').value || pin;
        getUserNameFn(gameIDin, -1);
    }
    return <div id="controls">
        Assume Player Name to claim stats:
        <input type="text" name="userID" id="userNameInput" placeholder={player_name} />
        {/* : */}
        {/* <input type="number" name="userPinID" id="pin" placeholder={pin != -1 ? pin : ""} /> */}
        <button id="load" className="btn" onClick={() => updateUserName()}> Change Name </button>
        <br />
        Player: {player_name}
    </div>

}

export default ClaimUserName;