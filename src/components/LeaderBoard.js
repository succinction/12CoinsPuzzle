function LeaderBoard({ data, refreshFn }) {
    const places = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

    return (
        <div className="leaders">
            <table>
                <thead>
                    <tr>
                        <th colSpan="6">LEADER BOARD  </th>
                        <th colSpan="2">   <button id="refreshBtn" onClick={refreshFn} >Refresh</button> </th>
                    </tr>
                    <tr>
                        <th colSpan="8">Your Stats (You are: {data.user || ""}) </th>
                    </tr>
                    <tr >
                        <th>Name</th>
                        <th>Total Games</th>
                        <th>Total Wins</th>
                        <th>Ranking Score</th>
                        <th>Current Win Streak</th>
                        <th>Best Win Streak</th>
                        <th>Accumulated Score</th>
                        <th>Best Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{data.user || "-"}</td>
                        <td>{data.attempts || "-"}</td>
                        <td>{data.wins || "-"}</td>
                        <td>{data.overall_score || "-"}</td>
                        <td>{data.current_streak || "-"}</td>
                        <td>{data.best_streak || "-"}</td>
                        <td>{data.score || "-"}</td>
                        <td>{data.best_score || "-"}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th colSpan="9">Highest Ranked Players *</th>
                    </tr>
                    <tr >
                        <th>Rank</th>
                        <th>Player Name</th>
                        <th>Ranking Score</th>
                        <th>Accumulated Score</th>
                        <th>Best Score</th>
                        <th>Total Games</th>
                        <th>Total Wins</th>
                        <th>Best Win Streak</th>
                        <th>Current Win Streak</th>
                    </tr>
                </thead>
                <tbody>
                    {!!data['bestPlayers'] && data.bestPlayers.length > 0 && data.bestPlayers.sort((a, b) => a.rank - b.rank).map((plyer, i) => <tr key={i}>
                        <td>{places[plyer.rank] || "-"}</td>
                        <td>{plyer.user || "-"}</td>
                        <td>{plyer.overall_score || "-"}</td>
                        <td>{plyer.score || "-"}</td>
                        <td>{plyer.best_score || "-"}</td>
                        <td>{plyer.attempts || "-"}</td>
                        <td>{plyer.wins || "-"}</td>
                        <td>{plyer.best_streak || "-"}</td>
                        <td>{plyer.current_streak || "-"}</td>
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
                            <td>{"-"}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th colSpan="4">Your Recent Games</th>
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
                        </tr>
                    }
                </tbody>
            </table>



            {/*<table>*/}
            {/*<thead>*/}
            {/*<tr>*/}
            {/*<th colSpan="6">Top Scored Games This Month *</th>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<th>Time</th>*/}
            {/*<th>Game Id</th>*/}
            {/*<th>Player Name</th>*/}
            {/*<th>Rank</th>*/}
            {/*<th>Game Type</th>*/}
            {/*<th>Date</th>*/}
            {/*</tr>*/}
            {/*</thead>*/}
            {/*<tbody>*/}

            {/*<tr>*/}
            {/*<td>:50</td>*/}
            {/*<td>Game_239</td>*/}
            {/*<td>JBH</td>*/}
            {/*<td>1</td>*/}
            {/*<td>12</td>*/}
            {/*<td>6/23/2017</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td>1:33</td>*/}
            {/*<td>Game_267</td>*/}
            {/*<td>Chris</td>*/}
            {/*<td>2</td>*/}
            {/*<td>12</td>*/}
            {/*<td>6/23/2017</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td>1:40</td>*/}
            {/*<td>Game_249</td>*/}
            {/*<td>Mazda</td>*/}
            {/*<td>3</td>*/}
            {/*<td>12</td>*/}
            {/*<td>6/23/2017</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td>1:55</td>*/}
            {/*<td>Game_210</td>*/}
            {/*<td>JBH</td>*/}
            {/*<td>1</td>*/}
            {/*<td>12</td>*/}
            {/*<td>6/23/2017</td>*/}
            {/*</tr>*/}
            {/*</tbody>*/}

            {/*</table>*/}
        </div>
    );
}

export default LeaderBoard;
