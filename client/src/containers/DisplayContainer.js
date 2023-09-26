import CardDisplay from "../components/display/CardDisplay"
import styled from "styled-components"
import "./background.css"
import "./NavContainer.css"
import "./DisplayContainer.css"
import { getWeatherWindow } from "../components/utilities/weatherWindow"
const DisplayContainer = ({ forecast, geoObj }) => {

    if (forecast.departure[0]) {

        const departureTime = geoObj.departureTime
        const departureDate = geoObj.departureDate

        const arrivalTime = geoObj.arrivalTime
        const arrivalDate = geoObj.arrivalDate

        const departureWindow = getWeatherWindow(departureTime, departureDate, forecast.departure)
        const arrivalWindow = getWeatherWindow(arrivalTime, arrivalDate, forecast.arrival)

        const weatherForDeparture = departureWindow.slice(0, 4)
        const weatherForDeparturePlusOne = departureWindow.slice(1, 5)
        const weatherForDeparturePlusTwo = departureWindow.slice(2, 6)
        const weatherForArrival = arrivalWindow.slice(0, 4)
        const weatherForArrivalPlusOne = arrivalWindow.slice(1, 5)
        const weatherForArrivalPlusTwo = arrivalWindow.slice(2, 6)

        return (
            <div className="display-container">
                <div id="departures">
                    <h3 className="display-title">Departure - {geoObj.departureName}</h3>
                    <CardDisplay weather={weatherForDeparture} />
                    <CardDisplay weather={weatherForDeparturePlusOne} />
                    <CardDisplay weather={weatherForDeparturePlusTwo} />
                </div>
                <div id="arrivals">
                    <h3 className="display-title">Arrival - {geoObj.arrivalName}</h3>
                    <CardDisplay weather={weatherForArrival} />
                    <CardDisplay weather={weatherForArrivalPlusOne} />
                    <CardDisplay weather={weatherForArrivalPlusTwo} />
                </div>
            </div>
        )

    } else {
        return (
            <div className="display-container">
            </div>
        )
    }
}

export default DisplayContainer