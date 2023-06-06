import CardDisplay from "../components/display/CardDisplay"

const DisplayContainer = ({forecast,geoObj}) => {

    // console.log("displaycontainer",forecast.arrival[1])
    // console.log("displaycontainer",forecast.arrival[0].time)
    
    const depTime = geoObj.departureTime
    const depDate = geoObj.departureDate
    // depTime 14:40
    // DisplayContainer.js:11 depDate 2023-06-22
    // depTime.slice(0,2) --> first two characters (hour)
    const arrTime = geoObj.arrivalTime
    const arrDate = geoObj.arrivalDate

   const concatSearch = `${depDate}T${depTime.slice(0,2)}:00`
    console.log("concatsearch ",concatSearch)

    const depIndex = forecast.departure.indexOf(concatSearch)
    console.log("depIndex ",depIndex)


    
    return (
        <>
        <h1>CONTAINER</h1>
        <div >
        {/* <p>{forecast? forecast.arrival[1].hour:""}</p> */}
        </div>
        {/* {info} */}
        </>
    )
}

export default DisplayContainer