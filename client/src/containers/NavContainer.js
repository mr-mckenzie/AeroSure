import {Link} from  'react-router-dom' 
import {getFlight} from '../services/InternalServices'
import { useState } from "react"

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
        <>
            <Link to="/"> Home </Link>

            <Link to="/about"> About </Link>

            <form onSubmit={handleSubmit}>
            
            <label for="flight-select">Choose a saved flight:</label>

            <select name="flights" id="flight-select" onChange = {onChange}>
                <option value="">--Please choose a saved flight--</option>
                {flightOptions}
            </select>
                <input type="submit" value="check weather"/>
            </form>

        </>
    )
}

export default NavContainer