import {Link} from  'react-router-dom' 
import {getFlight} from '../services/InternalServices'
import { useState } from "react"
import "./NavContainer.css"

const NavContainer = ({setSavedSearch, savedSearch, setGeoObj, savedSearchList, runForecast}) => {

    const [selectedFlight, setSelectedFlight] = useState([])

    let flightOptions = null

    if (savedSearchList && savedSearchList.length > 0) {

    flightOptions = savedSearchList.map((flight) => {

        return (
            <option key={flight._id} value={flight._id}>{flight.departureName} - {flight.arrivalName}, {flight.departureDate}</option>
        );
        });
    }


    const onChange = (event) => {
        const newlyChosenFlight = getFlight(event.target.value)

        newlyChosenFlight.then(returnedFlight => setSelectedFlight(returnedFlight))

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setGeoObj(selectedFlight)
        runForecast(selectedFlight)

    }

    return (
        <div className='nav-container'>
            <div className='nav-link-container'>
            <Link style={linkStyle} to="/"> Home </Link>
            <Link style={linkStyle} to="/about"> About </Link>
            </div>
            <div className='nav-form'>
            <form onSubmit={handleSubmit}>
            <label htmlFor="flight-select">Choose a saved flight:</label>
            <select className="nav-save-select" name="flights" id="flight-select" onChange = {onChange}>
                <option value="">--Please choose a saved flight--</option>
                {flightOptions}
            </select>
                <input className="nav-saved-button" type="submit" value="Check"/>
            </form>
            </div>
        </div>
    )
}

const linkStyle = {
    textDecoration:"none",
    color:"white",
    
}

export default NavContainer