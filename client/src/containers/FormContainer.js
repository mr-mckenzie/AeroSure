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
        return <option key={geoLocation.id} value={geoLocation} > {geoLocation.name} </option>
    } )

    const handleChange = (event) => {
        setSearch({
            departureString : event.target.value
        })
    }

// handle submit
// handle onChange


    return (
        <div className="departures">
        <label htmlFor="departure-name">From:</label>
        <input type="text" id="depature-name" value={search.departureString} onChange={handleChange}/>
        <label htmlFor="departure-date">Date:</label>
        <input type="date" id="departure-date"/>
        <label htmlFor="departure-time">Time:</label>
        <input type="time" id="departure-time"/>
        <label htmlFor=''
        </div>
    )
}

export default FormContainer