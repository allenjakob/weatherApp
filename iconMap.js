// this file exists to map over the returned api data that lets us know the physical description of the weather, and lets us translate it into one of our saved svgs
export const ICON_MAP = new Map()

// for any of the following returned codes, condense it to just one icon svg
addMapping([0, 1],"sun")
addMapping([2],"cloud-sun")
addMapping([3],"cloud")
addMapping([45, 48],"smog")
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],"cloud-showers-heavy")
addMapping([71, 73, 75, 77, 85, 86],"snowflake")
addMapping([95, 96, 99],"cloud-bolt")



// function that maps the values to the icons
function addMapping(values, icon){
    values.forEach(value=>{
        ICON_MAP.set(value, icon)
    })
}