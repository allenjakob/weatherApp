import './style.css'
import { getWeather } from './weather'
import { ICON_MAP } from './iconMap'

getWeather(53.500330636493274, -113.60438671826752, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(e=>{console.log(e)})

function renderWeather ({current, daily, hourly}){
    renderCurrentWeather(current)
    // renderDailyWeather(daily)
    // renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}

// nifty function that uses the data- selectors within our html to quickly change the value to the api data
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

const dailySection = document.querySelector('[data-day-section]')
const dayCardTemplate = document.getElementById('[day-card-template]')

function renderDailyWeather(daily){
    dailySection.innerHTML = ""
    daily.forEach(day=>{
        // cloning templates
        const element = dayCardTemplate.content.cloneNode(true)
        setValue('temp', day.maxTemp, {parent: element})
    })
}