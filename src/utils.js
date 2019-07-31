export function secInMinutes(timeInSecond) {
    minutes = Math.floor(timeInSecond / 60)
    seconds = timeInSecond - (minutes * 60)

    return {
        minutes: minutes,
        seconds: seconds
    }
}