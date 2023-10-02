import { getFlight } from '../services/InternalServices'
import { useState } from "react"
import "./NavContainer.css"

const NavContainer = ({ setGeoObj, savedSearchList, runForecast }) => {

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
        // COMMENTED OUT SUBMIT FUNCTIONALITY FOR ONLINE HOSTING WHERE BACKEND DISABLED
        // setGeoObj(selectedFlight)
        // runForecast(selectedFlight)
    }

    return (
        <div className='nav-container'>
            <div className='nav-link-container'>
                <a className="nav-link" href="/"> AeroSure </a>
                <a className="nav-link" href="/about"> About </a>
            </div>
            <div className='nav-form'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="flight-select">Saved flight:</label>
                    <select className="nav-save-select" name="flights" id="flight-select" onChange={onChange}>
                        <option value="">Please select</option>
                        {flightOptions}
                    </select>
                    <input className="nav-saved-button" type="submit" value="Check" />
                </form>
            </div>
        </div>
    )
}

export default NavContainer