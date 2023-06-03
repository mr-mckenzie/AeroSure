import { useState } from "react"
import ExternalServices from "../services/ExternalServices"

const FormContainer = ({geoList = [{results:{name:"Not Found"}}], setGeoList}) => {

    const [search, setSearch] = useState({
        departureString: "",
        departureDate: "",
        departureTime: "",
        arrivalString: "",
        arrivalDate: "",
        arrivalTime: ""
    })

    let parsedGeoList
    console.log("This is geoList:", geoList)

    let name 

    if (geoList) {
        name = "truthy"
    } else {
        name = "falsey"
    }

    console.log("GeoList is :", name) 

    if (geoList) {
    parsedGeoList = geoList.map( geoLocation => {
        const opt = `${geoLocation.name} - ${geoLocation.country} - ${geoLocation.admin1}`
        return <option key={geoLocation.id} value={opt} /> 
    } )}

    const onChange = (event) => {
        const newSearch = Object.assign({}, search)
        newSearch[event.target.name] = event.target.value
        setSearch(newSearch)
        if (event.target.name === "departureString" && event.target.value.length > 2) {
            console.log("LINE 39 IS RUNNING")
            const newGeoList = ExternalServices.getGeoList(event.target.value)
            setGeoList(newGeoList)
        }
    }

// handle submit
    const handleSubmit = (event) => {
        event.preventDefault()
        //set the state search
        console.log(event.target.value)


        return null
    }
    
// handle onChange


    return (
        <form onSubmit={handleSubmit}>
            <div className="departure-container">
                <label htmlFor="departure-name">From:</label>
                <input list="departure_name" name="departureString" id="departure-name" value={search.departureString} onChange={onChange} placeholder="type here"/>
                <datalist type="list"id="departure_name">
                    {parsedGeoList}
                </datalist>
                <label htmlFor="departure-date">Date:</label>
                <input type="date" id="departure-date" name="departureDate" value={search.departureDate} onChange={onChange}/>
                <label htmlFor="departure-time">Time:</label>
                <input type="time" id="departure-time" name="departureTime" value={search.departureTime} onChange={onChange}/>
            </div>
            <div className="arrival-container">
            <label htmlFor="arrival-name">To:</label>
                <input list="arrival_name"id="arrival-name" name="arrivalString" value={search.arrivalString} onChange={onChange} placeholder="type here"/>
                <datalist type="list"id="arrival_name">
                    {parsedGeoList}
                </datalist>
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


