import { useState } from "react"
import ExternalServices from "../services/ExternalServices"

const FormContainer = ({geoList, setGeoList, setGeoObj,runForecast}) => {

    const [search, setSearch] = useState({
        departureString: "",
        departureDate: "",
        departureTime: "",
        arrivalString: "",
        arrivalDate: "",
        arrivalTime: ""
    })

    const [departureGeoList, setDepartureGeoList] = useState("")
    const [arrivalGeoList, setArrivalGeoList] = useState("")

    const [selectedDepartureLocation, setSelectedDepartureLocation] = useState({
        departureLatitude: "",
        departureLongitude: "",
    })
    const [selectedArrivalLocation, setSelectedArrivalLocation] = useState({
        arrivalLatitude: "",
        arrivalLongitude: "",
    })

    let parsedDepartureGeoList;
    let parsedArrivalGeoList;
    
    const mapFunction = (inputGeoList) => {
    let resultOfMap
        if (inputGeoList && inputGeoList.length > 0) {
            resultOfMap = inputGeoList.map( geoLocation => {
                const opt = `${geoLocation.name} - ${geoLocation.country} - ${(geoLocation.admin1 || geoLocation.admin2) || null}`
                return <option key={geoLocation.id} value={geoLocation.id} > {opt} </option> 
        })}

    return resultOfMap}
    // onClick={()=>handleClick(geoLocation)}

    parsedDepartureGeoList = mapFunction(departureGeoList)
    parsedArrivalGeoList = mapFunction(arrivalGeoList)

    const onChangeSelect = (event) => {

        const id = event.target.value

        if (event.target.name === "departure-select") {
            const myLocation = departureGeoList.find((loc)=> loc.id == id)
            setSelectedDepartureLocation({
                departureName: myLocation.name, 
                departureLatitude: myLocation.latitude,
                departureLongitude: myLocation.longitude
                
            })
            console.log(`selected departure ${selectedDepartureLocation.name}`)
        }
        if (event.target.name === "arrival-select") {
            const myLocation = arrivalGeoList.find((loc)=> loc.id == id)
            setSelectedArrivalLocation({
                arrivalName: myLocation.name,
                arrivalLatitude: myLocation.latitude,
                arrivalLongitude: myLocation.longitude
            })
            console.log(`selected arrival ${selectedArrivalLocation.name}`)
        }

    }
    
    const onChange = (event) => {
        const newSearch = Object.assign({}, search)
        newSearch[event.target.name] = event.target.value

        if (event.target.name === "departureString" && event.target.value.length > 2) {
            const newGeoList = ExternalServices.getGeoList(event.target.value)
            newGeoList.then(resultofGetGeoList => setDepartureGeoList(resultofGetGeoList))
            newSearch["departureLatitude"] = event.target.latitude
            newSearch["departureLongitude"] = event.target.longitude
        }
        if (event.target.name === "arrivalString" && event.target.value.length > 2) {
            const newGeoList = ExternalServices.getGeoList(event.target.value)
            newGeoList.then(resultofGetGeoList => setArrivalGeoList(resultofGetGeoList))
            newSearch["arrivalLatitude"] = event.target.latitude
            newSearch["arrivalLongitude"] = event.target.longitude
        }
        setSearch(newSearch)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const newGeoObj = {
            departureName: selectedDepartureLocation.departureName,
            departureDate: search.departureDate,
            departureTime: search.departureTime,
            departureLongitude: selectedDepartureLocation.departureLongitude,
            departureLatitude: selectedDepartureLocation.departureLatitude,
            arrivalName: selectedArrivalLocation.arrivalName ? selectedArrivalLocation.arrivalName : "",
            arrivalDate: search.arrivalDate,
            arrivalTime: search.arrivalTime,
            arrivalLatitude: selectedArrivalLocation.arrivalLatitude,
            arrivalLongitude: selectedArrivalLocation.arrivalLongitude
        }
        setGeoObj(newGeoObj)

        setSearch({
            departureString: "",
            departureDate: "",
            departureTime: "",
            arrivalString: "",
            arrivalDate: "",
            arrivalTime: ""
        })

        setDepartureGeoList("")
        setArrivalGeoList("")
        setSelectedDepartureLocation({
            departureLatitude: "",
            departureLongitude: "",
        })

        setSelectedArrivalLocation({
            arrivalLatitude: "",
            arrivalLongitude: "",
        })

        runForecast(newGeoObj)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="departure-container">
                <label htmlFor="departure-name">From:</label>
                <input list="departure_name" name="departureString" id="departure-name" value={search.departureString} onChange={onChange} placeholder="type here"/>
                {parsedDepartureGeoList?                 
                <select id="departure-select" name="departure-select" onChange={onChangeSelect} required >
                    {parsedDepartureGeoList}
                </select>
                :
                null}
                <label htmlFor="departure-date">Date:</label>
                <input type="date" id="departure-date" name="departureDate" value={search.departureDate} onChange={onChange}/>
                <label htmlFor="departure-time">Time:</label>
                <input type="time" id="departure-time" name="departureTime" value={search.departureTime} onChange={onChange}/>
                <input type="hidden" id="departure-object" />
            </div>
            <div className="arrival-container">
            <label htmlFor="arrival-name">To:</label>
                <input list="arrival_name"id="arrival-name" name="arrivalString" value={search.arrivalString} onChange={onChange} placeholder="type here"/>
                {parsedArrivalGeoList?                 
                <select id="arrival-select" name="arrival-select" onChange={onChangeSelect} >
                    {parsedArrivalGeoList}
                </select>
                :
                null}
                <label htmlFor="arrival-date">Date:</label>
                <input type="date" id="arrival-date" name="arrivalDate" value={search.arrivalDate} onChange={onChange}/>
                <label htmlFor="arrival-time">Time:</label>
                <input type="time" id="arrival-time" name="arrivalTime" value={search.arrivalTime} onChange={onChange}/>
            </div>
            <input type="submit" value="Aerosure?"/>
        </form>



    )
}



export default FormContainer


