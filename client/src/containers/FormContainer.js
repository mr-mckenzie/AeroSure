import { useState } from "react"

const FormContainer = ({geoList}) => {

    const [search, setSearch] = useState({
        departureString: "",
        depatureDate: null,
        departureTime: null,
        arrivalString: "",
        arrivalDate: null,
        arrivalTime: null
    })


   

    const parsedGeoList = geoList.map( geoLocation => {
        const opt = `${geoLocation.name} - ${geoLocation.country} - ${geoLocation.admin1}`
        return <option key={geoLocation.id} value={opt} /> 
    } )

    const handleDepartureChange = (event) => {
        
        const newSearch = {...search,departureString:event.target.value}
        setSearch(newSearch)
    }
    const handleArrivalChange = (event) => {
        const newSearch = {...search,arrivalString:event.target.value}
        setSearch(newSearch)
    }

// handle submit
    const handleSubmit = () => {
        //set the state search
        
        return null
    }
    
// handle onChange


    return (
        <form onSubmit={handleSubmit}>
            <div className="departure-container">
                <label htmlFor="departure-name">From:</label>
                <input list="departure_name"id="depature-name" value={search.departureString} onChange={handleDepartureChange} placeholder="type here"/>
                <datalist type="list"id="departure_name">
                    {parsedGeoList}
                </datalist>
                <label htmlFor="departure-date">Date:</label>
                <input type="date" id="departure-date"/>
                <label htmlFor="departure-time">Time:</label>
                <input type="time" id="departure-time"/>
            </div>
            <div className="arrival-container">
            <label htmlFor="arrival-name">To:</label>
                <input list="arrival_name"id="arrival-name" value={search.arrivalString} onChange={handleArrivalChange} placeholder="type here"/>
                <datalist type="list"id="arrival_name">
                    {parsedGeoList}
                </datalist>
                <label htmlFor="arrival-date">Date:</label>
                <input type="date" id="arrival-date"/>
                <label htmlFor="arrival-time">Time:</label>
                <input type="time" id="arrival-time"/>
            </div>
            <input type="submit" value="Aerosure?"/>
        </form>



    )
}



export default FormContainer