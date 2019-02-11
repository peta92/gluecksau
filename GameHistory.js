export default function GameHistory(teamOneName, teamTwoName, teamOneGameData, teamTwoGameData) {
    this.timestamp =  Date.now()
    this.teamOne = {
        name: teamOneName,
        data: teamOneGameData
    }

    this.teamTwo = {
        name: teamTwoName,
        data: teamTwoGameData
    }
}