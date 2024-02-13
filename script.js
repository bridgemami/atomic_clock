'use strict';
const bodyEl = document.body;
const headerEl = document.createElement("header")
headerEl.innerHTML=`<h1>Atomic Clock</h1>`
bodyEl.append(headerEl)

const mainEl = document.createElement("main")
bodyEl.appendChild(mainEl)

const timeEl = document.createElement("section")
mainEl.appendChild(timeEl)

const dateEl = document.createElement("section")
mainEl.appendChild(dateEl)

const weatherEl = document.createElement("section")
mainEl.appendChild(weatherEl)


function getTime () {
    const date = new Date()
    const hour = date.getHours()
    const minute= date.getMinutes()
    const second = date.getSeconds()
    timeEl.innerHTML = `<h2>${hour} : ${singleDigits(minute)} : ${singleDigits(second)}</h2>`
}

function singleDigits (time) {
    if( time <10) {
       return time.toString().padStart(2, '0')
    }
    else {
        return time
    }
}

function getDate() {
    const date = new Date()
    const month = date.getMonth()+1
    const day = date.getDate()
    const year= date.getFullYear()
    const whatDay = date.getDay()
    const daysOfWeek =['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    dateEl.innerHTML = `<h2>${singleDigits(month)} / ${day} / ${year}</h2>
                        <h2>${daysOfWeek[whatDay]}</h2>
    `
}

async function weatherAPI (lat,lon) {
  try {
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=84e09a6592aa0b5f4c53d668e13e6f4d`)
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        // Parse the JSON in the response
        const data = await resp.json()
        console.log(data)
        const icon = data.weather.map(a => a.icon).join(' ');
        console.log(icon)
        const currentTemp = data.main.temp.toFixed(0)
        console.log(currentTemp)
        weatherEl.innerHTML = `<h2>The weather in ${data.name}:</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon of " />
        <p>${data.weather[0].main}</p>
        <p>Current temperature: ${currentTemp}&deg;F</p>
        
        `

  }
      catch (error) {
        // Handle errors
        console.error('Fetch error:', error);
      }
    
}

function geolocationSupported() {
  if (navigator.geolocation) {
    console.log("Geolocation is supported by this browser :)");
  } else {
    console.log("Geolocation is NOT supported by this browser :(");
  }
}

async function getCurrentLocation() {
 await navigator.geolocation.getCurrentPosition((result) => {
    let latitude = result.coords.latitude; // latitude value
   let longitude = result.coords.longitude; // longitude value
   weatherAPI(latitude, longitude)
  });
}

setInterval(getTime, 1000)
getDate()
getCurrentLocation()