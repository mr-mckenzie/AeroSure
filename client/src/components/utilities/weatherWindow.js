import weatherCodes from "./weathercodes"

// depTime 14:40
// depTime.slice(0,2) --> first two characters (hour)

export const getWeatherWindow = (time, date, forecast) => {
    const searchString = `${date}T${time.slice(0, 2)}:00`
    const indexOfSearchString = forecast.findIndex(element => element.hour === searchString)
    //get a weather window of 3 hours before and 4 hours after the flight time
    const weatherWindow = forecast.slice(indexOfSearchString - 3, indexOfSearchString + 4)
    //also adds text descriptions to weather relating to weather codes
    weatherWindow.map((element) => {
        const weatherObject = weatherCodes.find(weatherCode => element.code === weatherCode.code)
        return Object.assign(element, weatherObject)
    })
    return weatherWindow
}