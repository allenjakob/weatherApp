import './style.css'
import { getWeather } from './weather'
import { ICON_MAP } from './iconMap'

// gets users location data 
navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

// on success, make the api call with the correct info
function positionSuccess({coords}){
    getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather)
    
}

function positionError(){
    alert('There was an error getting your location. Please allow us to use your location, then refresh the page')
}

// renders weather data on the page
function renderWeather ({current, daily, hourly}){
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    // only allows 12 hours of data, can be changed here
    renderHourlyWeather(hourly.slice(0, 18))
    document.body.classList.remove("blurred")
}

// nifty central function that uses the data- selectors within our html to quickly change the value to the correct api data
function setValue(selector, value, {parent = document} = {}){
    parent.querySelector(`[data-${selector}]`).textContent = value
}

// converts the api data into the proper saved svg icon
function getIconUrl(iconCode){
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

// query selector for the icon
const currentIcon = document.querySelector('[data-current-icon]')
function renderCurrentWeather(current){
    currentIcon.src = getIconUrl(current.iconCode)
    setValue('current-temp', current.currentTemp)
    setValue('current-high', current.highTemp)
    setValue('current-low', current.lowTemp)
    setValue('current-fl-high', current.highFeelsLike)
    setValue('current-fl-low', current.lowFeelsLike)
    setValue('current-wind', current.windSpeed)
    setValue('current-precip', current.precip)
}

// simple day formatter, instead of short use long for the whole day name instead of Mon for ex.
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday: "long"})

// changing data in the daily section
const dailySection = document.querySelector('[data-day-section]')
const dayCardTemplate = document.getElementById('day-card-template')

function renderDailyWeather(daily){
    dailySection.innerHTML = ""
    daily.forEach(day=>{
        // cloning templates
        const element = dayCardTemplate.content.cloneNode(true)
        setValue('temp', day.maxTemp, {parent: element})
        setValue('date', DAY_FORMATTER.format(day.timestamp), {parent: element})
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)
    })
}

// simple day formatter
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour: "numeric"})
// changing data in the daily section
const hourlySection = document.querySelector('[data-hour-section]')
const hourRowTemplate = document.getElementById('hour-row-template')

function renderHourlyWeather(hourly){
    hourlySection.innerHTML = ""
    hourly.forEach(hour=>{
        // cloning templates
        const element = hourRowTemplate.content.cloneNode(true)
        setValue('temp', hour.temp, {parent: element})
        setValue('fl-temp', hour.feelsLike, {parent: element})
        setValue('wind', hour.windSpeed, {parent: element})
        setValue('precip', hour.precip, {parent: element})
        setValue('day', DAY_FORMATTER.format(hour.timestamp), {parent: element})
        setValue('time', HOUR_FORMATTER.format(hour.timestamp), {parent: element})
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
        hourlySection.append(element)
    })
}