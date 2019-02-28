function findValidElement(element) {
    if(element == undefined || element == null) {
        return null
    }
    
    let name = (element || {}).name || ""
    if(typeof(name) != "string" || name == "") {
        return null
    }

    validElements = Object.values(Game.elements).filter(exElement => {
        return name == exElement.name
    })

    return validElements[0] == undefined ? null : validElements[0]
}

function findBestRun(histories) {
    highestTotalPoints = 0
    for(history in histories) {
        if(history.run_points == undefined || history.run_points == null || history.run_points <= highestTotalPoints) {
            continue
        }

        highestTotalPoints = history.run_points
    }
}

export default class Game {

    static elements = {
        BUZZER: {
            name: 'buzzer',
            addFnc: current => current * 2,
            undoFnc: current => current / 2,
        },
        VAULTING_BOCK: {
            name: 'vaulting_bock',
            addFnc: current => current + 1,
            undoFnc: current => current - 1,
        },
        MAT: {
            name: 'mat',
            addFnc: current => current + 2,
            undoFnc: current => current - 2,
        },
        RINGS: {
            name: 'rings',
            addFnc: current => current + 3,
            undoFnc: current => current - 3,
        },
        VAULTING_HORSE: {
            name: 'vaulting_horse',
            addFnc: current => current + 4,
            undoFnc: current => current - 4,
        },
        LONG_BENCH: {
            name: 'long_bench',
            addFnc: current => current + 5,
            undoFnc: current => current - 5,
        }
    }

    constructor() {
        this.current = 0
        this.total = 0 

        this.runHistory = []
        this.totalHistory = []

        this.addPoints = this.addPoints.bind(this)
        this.saveRun = this.saveRun.bind(this)
        this.cancelRun = this.cancelRun.bind(this)
        this.getCurrent = this.getCurrent.bind(this)
        this.getTotal = this.getTotal.bind(this)
        this.removeLatestAddPoints = this.removeLatestAddPoints.bind(this)

    }

    addPoints(element) { 
        validElement = findValidElement(element)
        if(validElement == null) {
            return
        }

        this.current = validElement.addFnc(this.current)
        historyEntry = {name: validElement.name}
        this.runHistory.push(historyEntry)
    }

    removeLatestAddPoints() {
        latestElement = this.runHistory.pop()
        validElement = findValidElement(latestElement)
        if(validElement == null) {
            return
        }
        this.current = validElement.undoFnc(this.current)
    }

    /**
     * cancelRun resets all current points to 0 because the running player was hit by a ball
     */
    cancelRun() {
        this.current = 0
        this.runHistory = []
    }

    /**
     * saveRun saves the players point to total when he finish his run without getting hit by a ball
     */
    saveRun() {
        this.total += this.current
        this.totalHistory.push({run_points: this.current, history: this.runHistory})
        this.current = 0
        this.runHistory = []
    }

    getCurrent() {
        return this.current
    }

    getTotal() {
        return this.total
    }

    exportGameData() {
        history = []

        bestRun = findBestRun(this.totalHistory)

        //NOT NEEDED ANYMORE HERE, LATER WHEN THE DETAIL HISTORY VIEW WILL BE MADE THIS CODE CAN BE USEFUL MAYBE
/*
        for(runHistObj in this.totalHistory) {
            for(runHistory in runHistObj.history) {

            }
        }

        for ([_, gameElement] of Object.entries(Game.elements)) {
            elements = this.totalHistory.filter(element => {
                return element.name === gameElement.name
            })

            history.push({[gameElement.name]: elements.length})
        }
*/
        return { total_points: this.total, best_run_points: bestRun, history: this.totalHistory }
    }
}