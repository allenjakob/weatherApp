import './style.css'
import { getWeather } from './weather'

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(e=>{console.log(e)})

function renderWeather ({current}){


}