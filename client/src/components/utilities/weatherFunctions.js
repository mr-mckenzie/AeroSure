import weatherCodes from "./weathercodes"
import sun from "../../static/images/sunIcon.png"
import rain from "../../static/images/rainIcon.png"
import cloud from "../../static/images/cloudIcon.png"
import snow from "../../static/images/snowIcon.png"
import thunder from "../../static/images/thunderstormIcon.png"

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

export const checkSeverity = (forecast) => {

    const severityEarlier = forecast[0].severity + forecast[1].severity
    const severityPreviousHour = forecast[2].severity
    const severityNow = forecast[3].severity

    let severityString = ""
    let cardColour = ""

    if (severityNow >= 3) {
        cardColour = "card-red"
        severityString =  "High chance of delay/cancellation of flight"
    } else if (severityNow == 2) {
        cardColour = "card-yellow"
        severityString =  "Moderate chance of delay/cancellation of flight"
        if (severityPreviousHour >= 3 || severityPreviousHour == 2 && severityEarlier > 4) {
            cardColour = "card-red"
            severityString = "High chance of delay/cancellation of flight (possible earlier weather disruption)"
        }
    } else {
        cardColour = "card-green"
        severityString = "Low chance of delay/cancellation of flight"
        if (severityPreviousHour == 3 || severityPreviousHour >= 2 && severityEarlier >= 4) {
            cardColour = "card-yellow"
            severityString =  "Moderate chance of delay/cancellation of flight (possible earlier weather disruption)"
        }
    }
    return {string: severityString, colour: cardColour}
}

export const getImageDetails = (weatherCode) => {
    const sunCodes = [0, 1]
    const cloudCodes = [2, 3, 45, 48]
    const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]
    const snowCodes = [71, 73, 75, 77, 85, 86]
    const thunderCodes = [95, 96, 99]

    if (sunCodes.includes(weatherCode)) {
        return {image: sun, spin: "rotate-image"}
    } else if (cloudCodes.includes(weatherCode)) {
        return {image: cloud, spin: "card-image"}
    } else if (rainCodes.includes(weatherCode)) {
        return {image: rain, spin: "card-image"}
    } else if (snowCodes.includes(weatherCode)) {
        return {image: snow, spin: "card-image"}
    } else if (thunderCodes.includes(weatherCode)) {
        return {image: thunder, spin: "card-image"}
    }
}