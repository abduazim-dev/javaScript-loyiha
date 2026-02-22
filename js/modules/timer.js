function timer(deadlineSelector) {
    const deadline = deadlineSelector
    function getRemaning(endtime) {
        let days, hours, minutes, secunds
        const time = Date.parse(endtime) - Date.parse(new Date())

        if (time <= 0) {
            days = 0, hours = 0, minutes = 0, secunds = 0
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
                hours = Math.floor((time / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((time / (1000 * 60)) % 60),
                secunds = Math.floor((time / (1000)) % 60)
        }
        return {
            total: time,
            days,
            hours,
            minutes,
            secunds
        }
    }
    function addNol(number) {
        if (number < 10) {
            return `0${number}`
        }
        else {
            return number
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            day = timer.querySelector("#days"),
            minut = timer.querySelector("#minutes"),
            second = timer.querySelector("#seconds"),
            hour = timer.querySelector("#hours"),
            interval = setInterval(updateClock, 1000)

        updateClock()
        function updateClock() {
            const time = getRemaning(endtime)
            day.textContent = addNol(time.days)
            hour.textContent = addNol(time.hours)
            minut.textContent = addNol(time.minutes)
            second.textContent = addNol(time.secunds)

            if (time.total <= 0) {
                clearInterval(interval)
            }
        }

    }
    setClock(".timer", deadline)
}

export default timer