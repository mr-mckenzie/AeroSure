import { useState } from "react"
import ExternalServices from "../services/ExternalServices"

const FormContainer = ({geoList, setGeoList}) => {

    const [search, setSearch] = useState({
        departureString: "",
        departureDate: "",
        departureTime: "",
        arrivalString: "",
        arrivalDate: "",
        arrivalTime: ""
    })

    const [selectedLocation, setSelectedLocation] = useState({
        departureLatitude: "",
        departureLongitude: "",
        arrivalLatitude: "",
        arrivalLongitude: "",
    })

    let parsedGeoList;
    if (geoList && geoList.length > 0) {
     parsedGeoList = geoList.map( geoLocation => {
        const opt = `${geoLocation.name} - ${geoLocation.country} - ${(geoLocation.admin1 || geoLocation.admin2) || null}`
        return <option key={geoLocation.id} value={geoLocation.id} > {opt} </option> 
    } )}
    // onClick={()=>handleClick(geoLocation)}

    const onChangeSelect = (event) => {
        const id = event.target.value
        const myLocation = geoList.find((loc)=> loc.id == id)
        setSelectedLocation(myLocation)
    }
    
    const onChange = (event) => {
        const newSearch = Object.assign({}, search)
        newSearch[event.target.name] = event.target.value

        if (event.target.name === "departureString" && event.target.value.length > 2) {
            const newGeoList = ExternalServices.getGeoList(event.target.value)
            newGeoList.then(resultofGetGeoList => setGeoList(resultofGetGeoList))
            newSearch["departureLatitude"] = event.target.latitude
            newSearch["departureLongitude"] = event.target.longitude
        }
        if (event.target.name === "arrivalString" && event.target.value.length > 2) {
            const newGeoList = ExternalServices.getGeoList(event.target.value)
            newGeoList.then(resultofGetGeoList => setGeoList(resultofGetGeoList))
            newSearch["arrivalLatitude"] = event.target.latitude
            newSearch["arrivalLongitude"] = event.target.longitude
        }
        setSearch(newSearch)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const myForm = event.target
       
        console.log(event.target)
        console.log(event.target["departure-select"].name)
        //set the state search
        console.log(`submited ${event.target}`)
        // setSearch({
        //     departureString,
        //     departureLatitude: event.target.value
        // })

        return (null)
    }
console.log({parsedGeoList})
    return (
        <form onSubmit={handleSubmit}>
            <div className="departure-container">
                <label htmlFor="departure-name">From:</label>
                <input list="departure_name" name="departureString" id="departure-name" value={search.departureString} onChange={onChange} placeholder="type here"/>
                {parsedGeoList?                 
                <select id="departure-select" name="departure-select" onChange={onChangeSelect} required >
                    {parsedGeoList}
                </select>
                :
                null}

                {/* <datalist id="departure-select" name="departure-select">
                    {parsedGeoList}
                </datalist> */}
                <label htmlFor="departure-date">Date:</label>
                <input type="date" id="departure-date" name="departureDate" value={search.departureDate} onChange={onChange}/>
                <label htmlFor="departure-time">Time:</label>
                <input type="time" id="departure-time" name="departureTime" value={search.departureTime} onChange={onChange}/>
                <input type="hidden" id="departure-object" />
            </div>
            <div className="arrival-container">
            <label htmlFor="arrival-name">To:</label>
                <input list="arrival_name"id="arrival-name" name="arrivalString" value={search.arrivalString} onChange={onChange} placeholder="type here"/>
                <select id="arrival-select" name="arrival-select">
                    {parsedGeoList}
                </select>
                <label htmlFor="arrival-date">Date:</label>
                <input type="date" id="arrival-date" value={search.arrivalDate} onChange={onChange}/>
                <label htmlFor="arrival-time">Time:</label>
                <input type="time" id="arrival-time" value={search.arrivalTime} onChange={onChange}/>
            </div>
            <input type="submit" value="Aerosure?"/>
        </form>



    )
}



export default FormContainer


