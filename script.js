const bodyEl = document.body;
const headerEl = document.createElement("header")
headerEl.innerHTML=`<h1>Atomic Clock</h1>`
bodyEl.append(headerEl)

const mainEl = document.createElement("main")
bodyEl.append(mainEl)

const timeEl = document.createElement("section")
mainEl.append(timeEl)


function getDate () {
    const date = new Date()
    const hour = date.getHours()
    const minute= date.getMinutes()
    const second = date.getSeconds()
    timeEl.innerHTML= `<h2>${hour} : ${singleDigits(minute)} : ${singleDigits(second)}</h2>`
}

function singleDigits (time) {
    if( time <10) {
        console.log(time.toString().padStart(2, '0'))
       return time.toString().padStart(2, '0')
    }
    else {
        return time
    }
}

setInterval(getDate, 1000)
