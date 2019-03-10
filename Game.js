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
    for(history of histories) {
        if(history.run_points == undefined || history.run_points == null || history.run_points <= highestTotalPoints) {
            continue
        }

        highestTotalPoints = history.run_points
    }
    return highestTotalPoints
}

buzzerAddFnc = current => current * 2
buzzerUndoFnc = current => current / 2
vaultingBockAddFnc = current => current + 1
vaultingBockUndoFnc = current => current - 1
matAddFnc = current => current + 2
matUndoFnc = current => current - 2
ringsAddFnc = current => current + 3
ringsUndoFnc = current => current - 3
vaultingHorseAddFnc = current => current + 4
vaultingHorseUndoFnc = current => current - 4
longBenchAddFnc = current => current + 5
longBenchUndoFnc = current => current - 5

export default class Game {

    static elements = {
        BUZZER: {
            name: 'buzzer',
            addFnc: buzzerAddFnc,
            undoFnc: buzzerUndoFnc,
        },
        VAULTING_BOCK: {
            name: 'vaulting_bock',
            addFnc: vaultingBockAddFnc,
            undoFnc: vaultingBockUndoFnc,
        },
        MAT: {
            name: 'mat',
            addFnc: matAddFnc,
            undoFnc: matUndoFnc,
        },
        RINGS: {
            name: 'rings',
            addFnc: ringsAddFnc,
            undoFnc: ringsUndoFnc,
        },
        VAULTING_HORSE: {
            name: 'vaulting_horse',
            addFnc: vaultingHorseAddFnc,
            undoFnc: vaultingHorseUndoFnc,
        },
        LONG_BENCH: {
            name: 'long_bench',
            addFnc: longBenchAddFnc,
            undoFnc: longBenchUndoFnc,
        }
    }

    constructor() {
        this.current = 0
        this.total = 0 

        this.runHistory = []
        this.totalHistory = []

        // This variable holds the position of the last clicked element, so it can be ensured that the same element isn't clicked multiple times in a row
        this.lastPosition = 0

        this.addPoints = this.addPoints.bind(this)
        this.saveRun = this.saveRun.bind(this)
        this.cancelRun = this.cancelRun.bind(this)
        this.getCurrent = this.getCurrent.bind(this)
        this.getTotal = this.getTotal.bind(this)
        this.removeLatestAddPoints = this.removeLatestAddPoints.bind(this)

    }

    addPoints(element, position) { 
        // The same element on the same position (some element exists twice therefore we need the position) can just be clicked once in a row. Otherwise it doesn't count
        if(this.lastPosition != 0 && this.lastPosition == position) {
            return
        }

        validElement = findValidElement(element)
        if(validElement == null) {
            return
        }
        
        this.lastPosition = position
        this.current = validElement.addFnc(this.current)
        historyEntry = {name: validElement.name, position: position}
        this.runHistory.push(historyEntry)
    }

    removeLatestAddPoints() {
        latestElement = this.runHistory.pop()
        validElement = findValidElement(latestElement)
        if(validElement == null) {
            return
        }
        this.current = validElement.undoFnc(this.current)

        newLatestElement = this.runHistory[this.runHistory.length-1]
        this.lastPosition = newLatestElement.position
    }

    /**
     * cancelRun resets all current points to 0 because the running player was hit by a ball
     */
    cancelRun() {
        this.lastPosition = 0
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
        this.lastPosition = 0
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