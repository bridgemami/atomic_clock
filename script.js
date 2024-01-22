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
    const seconds = date.getSeconds()
    // timeEl.innerHTML= `<p>${seconds}</p>`
    timeEl.textContent= seconds
}

setInterval(getDate, 1000)
