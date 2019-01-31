function findValidElement(element) {
    if(element == undefined || element == null) {
        return null;
    }
    
    let name = (element || {}).name || ""
    if(typeof(name) != "string" || name == "") {
        return null;
    }

    validElements = Object.values(Game.elements).filter(exElement => {
        return name == exElement.name;
    })

    return validElements[0] == undefined ? null : validElements[0];
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
        this.current = 0;
        this.total = 0; 


        this.runHistory = [];
        this.totalHistory = [];

        this.addPoints = this.addPoints.bind(this);
        this.saveRun = this.saveRun.bind(this);
        this.cancelRun = this.cancelRun.bind(this);
        this.getCurrent = this.getCurrent.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.removeLatestAddPoints = this.removeLatestAddPoints.bind(this);

    }

    addPoints(element) { 
        validElement = findValidElement(element);
        if(validElement == null) {
            return;
        }

        this.current = validElement.addFnc(this.current);
        this.runHistory.push(validElement);
    }

    removeLatestAddPoints() {
        latestElement = this.runHistory.pop();
        if(latestElement == undefined) {
            return;
        }
        this.current = latestElement.undoFnc(this.current);
    }

    /**
     * cancelRun resets all current points to 0 because the running player was hit by a ball
     */
    cancelRun() {
        this.current = 0;
        this.runHistory = [];
    }

    /**
     * saveRun saves the players point to total when he finish his run without getting hit by a ball
     */
    saveRun() {
        this.total += this.current;
        this.totalHistory = this.totalHistory.concat(this.runHistory);
        this.current = 0;
        this.runHistory = [];
    }

    getCurrent() {
        return this.current;
    }

    getTotal() {
        return this.total;
    }
}