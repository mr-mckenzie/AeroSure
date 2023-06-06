import CardDisplay from "../components/display/CardDisplay"


const DisplayContainer = ({forecast,geoObj}) => {

    // console.log("displaycontainer",forecast.arrival[1])
    // console.log("displaycontainer",forecast.arrival[0].time)
    console.log("THIS IS FORECAST INSIDE DISPLAY CONTAINER:", forecast)

    let slicedDepartures
    let slicedArrivals

    if (forecast.departure[0]) {

    
        console.log("forecast departure",forecast.departure)
        console.log("forecast arrival",forecast.arrival)


        const depTime = geoObj.departureTime
        const depDate = geoObj.departureDate
        // depTime 14:40
        // DisplayContainer.js:11 depDate 2023-06-22
        // depTime.slice(0,2) --> first two characters (hour)
        const arrTime = geoObj.arrivalTime
        const arrDate = geoObj.arrivalDate

        const concatDepSearch = `${depDate}T${depTime.slice(0,2)}:00`
        console.log("concatsearch ",concatDepSearch)

        const depIndex = forecast.departure.findIndex( arrayElement => arrayElement.hour === concatDepSearch) 
        console.log("depIndex ",depIndex)

        const concatArrSearch = `${arrDate}T${arrTime.slice(0,2)}:00`
        console.log("concatsearch ",concatArrSearch)

        const arrIndex = forecast.arrival.findIndex( arrayElement => arrayElement.hour === concatArrSearch) 
        console.log("depIndex ",arrIndex)

        slicedDepartures = forecast.departure.slice(depIndex - 3, depIndex + 4)
        slicedArrivals = forecast.arrival.slice(arrIndex - 3, arrIndex + 4)

    
    return (
        <>
        <h1>CONTAINER</h1>
        <div >
            <CardDisplay slicedDepartures={slicedDepartures} slicedArrivals={slicedArrivals} geoObj={geoObj}/>
        </div>
        {/* {info} */}
        </>
    )
    } else {
        return null
    }
}

export default DisplayContainer