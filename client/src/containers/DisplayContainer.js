import CardDisplay from "../components/display/CardDisplay"
import styled from "styled-components"

const DisplayContainer = ({forecast,geoObj}) => {

    const CardDisplayContainer = styled.div`
    display:flex;
    border:solid thin red;
    height:70vh;
    justify-content:space-evenly;
    `

    let slicedDepartures
    let slicedArrivals

    if (forecast.departure[0]) {


        const depTime = geoObj.departureTime
        const depDate = geoObj.departureDate
        // depTime 14:40
        // DisplayContainer.js:11 depDate 2023-06-22
        // depTime.slice(0,2) --> first two characters (hour)
        const arrTime = geoObj.arrivalTime
        const arrDate = geoObj.arrivalDate

        const concatDepSearch = `${depDate}T${depTime.slice(0,2)}:00`

        const depIndex = forecast.departure.findIndex( arrayElement => arrayElement.hour === concatDepSearch) 

        const concatArrSearch = `${arrDate}T${arrTime.slice(0,2)}:00`

        const arrIndex = forecast.arrival.findIndex( arrayElement => arrayElement.hour === concatArrSearch) 
  
        slicedDepartures = forecast.departure.slice(depIndex - 3, depIndex + 4)
        slicedArrivals = forecast.arrival.slice(arrIndex - 3, arrIndex + 4)

        const weatherCodes = [ //make sure to make a new weathercodes file!!!
        {code: 0, description: "clear sky" , severity: 1},
        {code: 1, description: "mainly clear", severity: 1},
        {code: 2, description: "partly cloudy", severity: 1},
        {code: 3, description: "overcast", severity: 1},
        {code: 45, description: "fog", severity: 2},
        {code: 48, description: "depositing rime fog", severity: 2},
        {code: 51, description: "light drizzle", severity: 1},
        {code: 53, description: "moderate drizzle", severity: 1},
        {code: 55, description: "intense drizzle", severity: 1},
        {code: 56, description: "light freezing drizzle", severity: 2},
        {code: 57, description: "intense frezzing drizzle", severity: 3},
        {code: 61, description: "slight rain", severity: 1},
        {code: 63, description: "moderate rain", severity: 1},
        {code: 65, description: "heavy rain", severity: 2},
        {code: 66, description: "light freezing rain", severity: 3},
        {code: 67, description: "heavy freezing rain", severity: 3},
        {code: 71, description: "slight snowfall", severity: 2},
        {code: 73, description: "moderate snowfall", severity: 2},
        {code: 75, description: "heavy snowfall", severity: 3},
        {code: 77, description: "snow grains", severity: 2},
        {code: 80, description: "slight rain showers", severity: 1},
        {code: 81, description: "moderate rain showers", severity: 1},
        {code: 82, description: "violent rain showers", severity: 2},
        {code: 85, description: "slight snow showers", severity: 2},
        {code: 86, description: "heavy snow showers", severity: 3},
        {code: 95, description: "thunderstorm", severity: 3},
        {code: 96, description: "thunderstorm with slight hail", severity: 3},
        {code: 99, description: "thunderstorm with heavy hail", severity: 3}
    ]

    const matchDepartureCode = weatherCodes.find(element => element.code === slicedDepartures[3].code)
    // console.log(matchDepartureCode)
    

    const departuresWithWeatherCodes = slicedDepartures.map((element)=>{
            const weatherObj = weatherCodes.find(weatherCode => element.code === weatherCode.code)
            return Object.assign(element,weatherObj)
        })
    const arrivalsWithWeatherCodes = slicedArrivals.map((element)=>{
            const weatherObj = weatherCodes.find(weatherCode => element.code === weatherCode.code)
            return Object.assign(element,weatherObj)
        })

    console.log(departuresWithWeatherCodes)

    const weatherForExactDeparture = departuresWithWeatherCodes.slice(0,4)
    const weatherForExactDeparture1 = departuresWithWeatherCodes.slice(1,5)
    const weatherForExactDeparture2 = departuresWithWeatherCodes.slice(2,6)
    const weatherForExactArrival = arrivalsWithWeatherCodes.slice(0,4)
    const weatherForExactArrival1 = arrivalsWithWeatherCodes.slice(1,5)
    const weatherForExactArrival2 = arrivalsWithWeatherCodes.slice(2,6)

    return (
        <CardDisplayContainer className="display-container">
        <div id="departures">
            <h3>{geoObj.departureName}</h3>
            <CardDisplay weather={weatherForExactDeparture} />
            <CardDisplay weather={weatherForExactDeparture1} /> 
            <CardDisplay weather={weatherForExactDeparture2} />
        </div> 
        <div id="arrivals">
            <h3>{geoObj.arrivalName}</h3>
            <CardDisplay weather={weatherForExactArrival} />
            <CardDisplay weather={weatherForExactArrival1} />
            <CardDisplay weather={weatherForExactArrival2} />
        </div>
        </CardDisplayContainer>
    )

    } else {
        return null
    }


}



export default DisplayContainer