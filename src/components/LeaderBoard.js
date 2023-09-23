function LeaderBoard({ data, refreshFn }) {
    const ranking = (num) => {
        return num < 3 ? ["1st", "2nd", "3rd"][num] : (num + 1) + "th";
    }

    // if (!!data['bestPlayers'] && data.bestPlayers.length > 0 ) {
    //     data.bestPlayers.forEach(obj => {
    //         if (obj.user === data.user) {
    //             obj.user = `<`

    //         }
    //     })
    // }

    return (
        <div className="leaders">
            <table>
                <thead>
                    {/* <tr> */}
                        {/* <th colSpan="7">LEADER BOARD  </th> */}
                    {/* </tr> */}
                    <tr>
                        <th colSpan="7"> Stats for {data.user || "-"} </th>
                        <th colSpan="2">   <button id="refreshBtn" className="btn" onClick={refreshFn} >Refresh</button> </th>
                    </tr>
                    <tr >
                        <th>Name</th>
                        <th>Ranking Score</th>
                        <th>Mastery Score</th>
                        <th>Accum Score</th>
                        <th>Best Score</th>
                        <th>Total Games</th>
                        <th>Total Wins</th>
                        <th>Current Win Streak</th>
                        <th>Best Win Streak</th>
                        {/* <th>Game Types</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{data.user || "-"}</td>
                        <td>{data.ranking_score || "-"}</td>
                        <td>{data.overall_score || "-"}</td>
                        <td>{data.score || "-"}</td>
                        <td>{data.best_score || "-"}</td>
                        <td>{data.attempts || "-"}</td>
                        <td>{data.wins || "-"}</td>
                        <td>{data.current_streak || "-"}</td>
                        <td>{data.best_streak || "-"}</td>
                        {/* <td>{data.game_types || "-"}</td> */}
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th colSpan="9">Highest Ranked Players</th>
                    </tr>
                    <tr >
                        <th>Rank</th>
                        <th>Player Name</th>
                        <th>Ranking Score</th>
                        <th>Mastery Score</th>
                        <th>Accum Score</th>
                        <th>Best Score</th>
                        <th>Total Games</th>
                        <th>Total Wins</th>
                        {/* <th>Best Win Streak</th>
                        <th>Current Win Streak</th> */}
                        {/* <th>Game Types</th> */}
                    </tr>
                </thead>
                <tbody>
                    {!!data['bestPlayers'] && data.bestPlayers.length > 0 && data.bestPlayers.sort((a, b) => a.rank - b.rank)
                            .map((plyer, i) => <tr key={i}>
                        <td>{ranking(Number(plyer.rank)) || "-"}</td>
                        <td>{(plyer.user === data.user) ? <span className="player-on-board">{plyer.user}</span> : plyer.user}</td>
                        <td>{plyer.ranking_score || "-"}</td>
                        <td>{plyer.overall_score || "-"}</td>
                        <td>{plyer.score || "-"}</td>
                        <td>{plyer.best_score || "-"}</td>
                        <td>{plyer.attempts || "-"}</td>
                        <td>{plyer.wins || "-"}</td>
                        {/* <td>{plyer.best_streak || "-"}</td>
                        <td>{plyer.current_streak || "-"}</td> */}
                        {/* <td>{data.game_types || "-"}</td> */}
                    </tr>
                    )}
                    {!!data['bestPlayers'] && data.bestPlayers.length > 0  ||
                        <tr >
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th colSpan="7">Recent Games for {data.user || "-"}</th>
                    </tr>
                    <tr>
                        <th>Game</th>
                        <th>Date</th>
                        <th>Final Time</th>
                        <th>Score</th>
                        <th>Game Type</th>
                        <th>Won</th>
                        <th>Measurements</th>
                    </tr>
                </thead>
                <tbody>
                    {!!data['yourLastGames'] && data.yourLastGames.length > 0 && data.yourLastGames.map((gamex, i) => <tr key={i}>
                        <td>{data.yourLastGames.length - i || "-"}</td>
                        <td>{gamex.date || "-"}</td>
                        <td>{gamex.finalTime || "-"}</td>
                        <td>{gamex.score || "-"}</td>
                        <td>{gamex.gameType || "-"}</td>
                        <td>{gamex.won || "-"}</td>
                        <td>{gamex.numberOfMeasurements || "-"}</td>
                    </tr>
                    )}
                    {!!data['yourLastGames'] ||
                        <tr >
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                            <td>{"-"}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default LeaderBoard;
