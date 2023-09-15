import { useState } from 'react';

function LeaderBoard({ data }) {
    const [initialized, setInitialized] = useState(false);
    return (
        <div className="leaders">
            <table>
                <thead>
                    <tr>
                        <th colSpan="8">LEADER BOARD </th>
                    </tr>
                    {/*<tr>*/}
                    {/*<th colSpan="8">Refresh</th>*/}
                    {/*</tr>*/}
                    <tr>
                        <th colSpan="8">Your Stats (You are: {data.user || ""}) </th>
                    </tr>
                    <tr >
                        <th>Name</th>
                        <th>Ranking Score</th>
                        <th>Current Win Streak</th>
                        <th>Best Win Streak</th>
                        <th>Total Wins</th>
                        <th>Total Attempts</th>
                        <th>Accumulated Score</th>
                        <th>Best Score</th>
                    </tr>
                    {/*</tr>*/}
                </thead>
                <tbody>
                    <tr >
                        <td>{ data.user || "-"}</td>
                        <td>{ data.overall_score || "-"}</td>
                        <td>{ data.current_streak || "-"}</td>
                        <td>{ data.best_streak || "-"}</td>
                        <td>{ data.wins || "-"}</td>
                        <td>{ data.attempts || "-"}</td>
                        <td>{ data.score || "-"}</td>
                        <td>{ data.best_score || "-"}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th colSpan="8">Highest Ranked Players *</th>
                    </tr>
                    <tr >
                        <th>Player Name</th>
                        <th>Ranking Score</th>
                        <th>Best Win Streak</th>
                        <th>Current Win Streak</th>
                        <th>Total Wins</th>
                        <th>Total Attempts</th>
                        <th>Accumulated Score</th>
                        <th>Best Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >

                        <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >

                    <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >

                    <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >

                    <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >

                    <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >
                        <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >
                        <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >
                        <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >
                        <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>
                    <tr >
                        <td>{initialized && data.bestPlayers[0].user || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].overall_score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].current_streak || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].wins || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].attempts || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].score || "-"}</td>
                        <td>{initialized && data.bestPlayers[0].best_score || "-"}</td>

                    </tr>

                </tbody>
            </table>
            
            <table>
                <thead>
                    <tr>
                        <th colSpan="4">Your Recent Games</th>
                    </tr>
                    <tr>
                        <th>Game ID</th>
                        <th>Final Time</th>
                        <th>Score</th>
                        <th>Game Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{initialized && data.yourLastGames[0].gameID}</td>
                        <td>{initialized && data.yourLastGames[0].finalTime}</td>
                        <td>{initialized && data.yourLastGames[0].score}</td>
                        <td>{initialized && data.yourLastGames[0].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[1].gameID}</td>
                        <td>{initialized && data.yourLastGames[1].finalTime}</td>
                        <td>{initialized && data.yourLastGames[1].score}</td>
                        <td>{initialized && data.yourLastGames[1].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[2].gameID}</td>
                        <td>{initialized && data.yourLastGames[2].finalTime}</td>
                        <td>{initialized && data.yourLastGames[2].score}</td>
                        <td>{initialized && data.yourLastGames[2].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[3].gameID}</td>
                        <td>{initialized && data.yourLastGames[3].finalTime}</td>
                        <td>{initialized && data.yourLastGames[3].score}</td>
                        <td>{initialized && data.yourLastGames[3].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[4].gameID}</td>
                        <td>{initialized && data.yourLastGames[4].finalTime}</td>
                        <td>{initialized && data.yourLastGames[4].score}</td>
                        <td>{initialized && data.yourLastGames[4].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[5].gameID}</td>
                        <td>{initialized && data.yourLastGames[5].finalTime}</td>
                        <td>{initialized && data.yourLastGames[5].score}</td>
                        <td>{initialized && data.yourLastGames[5].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[6].gameID}</td>
                        <td>{initialized && data.yourLastGames[6].finalTime}</td>
                        <td>{initialized && data.yourLastGames[6].score}</td>
                        <td>{initialized && data.yourLastGames[6].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[7].gameID}</td>
                        <td>{initialized && data.yourLastGames[7].finalTime}</td>
                        <td>{initialized && data.yourLastGames[7].score}</td>
                        <td>{initialized && data.yourLastGames[7].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[8].gameID}</td>
                        <td>{initialized && data.yourLastGames[8].finalTime}</td>
                        <td>{initialized && data.yourLastGames[8].score}</td>
                        <td>{initialized && data.yourLastGames[8].gameType}</td>
                    </tr>
                    <tr>
                        <td>{initialized && data.yourLastGames[9].gameID}</td>
                        <td>{initialized && data.yourLastGames[9].finalTime}</td>
                        <td>{initialized && data.yourLastGames[9].score}</td>
                        <td>{initialized && data.yourLastGames[9].gameType}</td>
                    </tr>
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
