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

async function weatherAPI (lat,long) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exlude=minuetly,hourly,daily,alerts&appid=84e09a6592aa0b5f4c53d668e13e6f4d`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON in the response
        return  awaitresponse.json();
      })
      .then(data => {
        // Process the data from the API
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Fetch error:', error);
      });
    
}

function geolocationSupported() {
  if (navigator.geolocation) {
    console.log("Geolocation is supported by this browser :)");
    getCurrentLocation();
  } else {
    console.log("Geolocation is NOT supported by this browser :(");
  }
}
geolocationSupported();

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition((result) => {
    let latitude = result.coords.latitude; // latitude value
   let longitude = result.coords.longitude; // longitude value
   weatherAPI(latitude, longitude)
  });
}

setInterval(getTime, 1000)
getDate()
getCurrentLocation()