import { useState } from "react"
import ExternalServices from "../services/ExternalServices"
import { postFlight, getFlights } from "../services/InternalServices"
import "./FormContainer.css"


const FormContainer = ({ setGeoObj, runForecast, setSavedSearchList }) => {

    const today = new Date()
    //maximum forecast is 16 days in future
    const todayPlus16Days = new Date(today.getTime() + 1296000000)
    const dateToday = today.toISOString().slice(0,10)
    const maxDate = todayPlus16Days.toISOString().slice(0,10)
    console.log(`today date: ${dateToday}`)
    console.log(`max date: ${maxDate}`)

    //empty form state
    const [search, setSearch] = useState({
        departureString: "",
        departureDate: "",
        departureTime: "",
        arrivalString: "",
        arrivalDate: "",
        arrivalTime: ""
    })
    //state to indicate if search should be saved
    const [saveSearchChecked, setSaveSearchChecked] = useState(false)
    //state holding geo lists for departure and arrival
    const [departureGeoList, setDepartureGeoList] = useState("")
    const [arrivalGeoList, setArrivalGeoList] = useState("")
    //departure details
    const [selectedDepartureLocation, setSelectedDepartureLocation] = useState({
        departureLatitude: "",
        departureLongitude: "",
    })
    //arrival details
    const [selectedArrivalLocation, setSelectedArrivalLocation] = useState({
        arrivalLatitude: "",
        arrivalLongitude: "",
    })

    //function to map the geo locations into a list
    const mapFunction = (inputGeoList) => {
        let resultOfMap
        if (inputGeoList && inputGeoList.length > 0) {
            resultOfMap = inputGeoList.map(geoLocation => {
                const locationString = `${geoLocation.name} - ${geoLocation.country} ${(geoLocation.admin1 ? "- " + geoLocation.admin1 : false || geoLocation.admin2 ? "- " + geoLocation.admin2 : false) || " "}` // consider adding a helper function, as same logic to the left can be needed for edge case when "country" is undefined nice api :)
                return <option id={geoLocation.id} value={geoLocation.id} > {locationString} </option>
            })
        }
        return resultOfMap
    }

    const mappedDepartureList = mapFunction(departureGeoList)
    const mappedArrivalList = mapFunction(arrivalGeoList)

    const onChangeSelect = (event) => {

        // allows selection of placeholder option w/o crashing
        if (event.target.value) {
            const selectedID = event.target.value

            if (event.target.id === "departure-select") {
                //grab location from dropdown
                const dropdownDepartureLocation = departureGeoList.find((selectedLocation) => selectedLocation.id == selectedID)
                //set the selected departure state
                setSelectedDepartureLocation({
                    departureName: dropdownDepartureLocation.name + ", " + dropdownDepartureLocation.country,
                    departureLatitude: dropdownDepartureLocation.latitude,
                    departureLongitude: dropdownDepartureLocation.longitude
                })
            }
            if (event.target.id === "arrival-select") {
                //grab location from dropdown
                const dropdownArrivalLocation = arrivalGeoList.find((selectedLocation) => selectedLocation.id == selectedID)
                //set the selected arrival state
                setSelectedArrivalLocation({
                    arrivalName: dropdownArrivalLocation.name + ", " + dropdownArrivalLocation.country,
                    arrivalLatitude: dropdownArrivalLocation.latitude,
                    arrivalLongitude: dropdownArrivalLocation.longitude
                })
            }
        }
    }

    const onChange = (event) => {
        const newSearch = Object.assign({}, search)
        newSearch[event.target.name] = event.target.value

        if (event.target.name === "save") {
            setSaveSearchChecked(!saveSearchChecked)
        }
        if (event.target.name === "departureString" && event.target.value.length >= 2) {
            setDepartureGeoList([])
        }
        if (event.target.name === "arrivalString" && event.target.value.length >= 2) {
            setArrivalGeoList([])
        }
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
            arrivalName: selectedArrivalLocation.arrivalName,
            arrivalDate: search.arrivalDate,
            arrivalTime: search.arrivalTime,
            arrivalLatitude: selectedArrivalLocation.arrivalLatitude,
            arrivalLongitude: selectedArrivalLocation.arrivalLongitude
        }
        setGeoObj(newGeoObj)

        //post to db if 'save search' option selected
        if (saveSearchChecked === true) {
            postFlight(newGeoObj)
                .then(() => {
                    getFlights().then((returnedFlights) => {
                        setSavedSearchList(returnedFlights)
                    })
                })
        }

        // reset form fields
        setSearch({
            departureString: "",
            departureDate: "",
            departureTime: "",
            arrivalString: "",
            arrivalDate: "",
            arrivalTime: ""
        })
        setSaveSearchChecked(false)
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

        // run forecast function
        runForecast(newGeoObj)
    }

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="inform-container">
                <div className="departure-container">
                    <label className="form-label" htmlFor="departure-name">From:</label>
                    <input className="form-input" name="departureString" id="departure-name" value={search.departureString} onChange={onChange} placeholder="Enter your search" />
                    <select id="departure-select" className="search-select" name="departure-select" onChange={onChangeSelect} required >
                        {mappedDepartureList ? <option value=""> Please select </option> : <option value="">No results</option>}
                        {mappedDepartureList}
                    </select>
                    <label className="form-label" htmlFor="departure-date">Date:</label>
                    <input className="form-input" type="date" id="departure-date" name="departureDate" value={search.departureDate} onChange={onChange} min={dateToday} max={maxDate} required />
                    <label className="form-label" htmlFor="departure-time">Time:</label>
                    <input className="form-input" type="time" id="departure-time" name="departureTime" value={search.departureTime} onChange={onChange} required />
                </div>
                <div className="arrival-container">
                    <label className="form-label" htmlFor="arrival-name">To:</label>
                    <input className="form-input" id="arrival-name" name="arrivalString" value={search.arrivalString} onChange={onChange} placeholder="Enter your search" />
                    <select id="arrival-select" className="search-select" name="arrival-select" onChange={onChangeSelect} required >
                        {mappedArrivalList ? <option value=""> Please select </option> : <option value="">No results</option>}
                        {mappedArrivalList}
                    </select>
                    <label className="form-label" htmlFor="arrival-date">Date:</label>
                    <input className="form-input" type="date" id="arrival-date" name="arrivalDate" value={search.arrivalDate} onChange={onChange} min={search.departureDate || dateToday} max={maxDate} required />
                    <label className="form-label" htmlFor="arrival-time">Time:</label>
                    <input className="form-input" type="time" id="arrival-time" name="arrivalTime" value={search.arrivalTime} onChange={onChange} required />
                </div>
            </div>
            <div className="submit-save-container">
                <div className="submit-container">
                    <input className="form-button" type="submit" value="Aerosure?" />
                </div>
                {/* COMMENTED OUT CHECKBOX TO SAVE SEARCH FOR ONLINE HOSTING WHERE SERVER SIDE IS NOT ACTIVE */}
                {/* <div className="form-save">
                    <label htmlFor="save-search">Save</label>
                    <input id="save-search" name="save" type="checkbox" value={saveSearchChecked} checked={saveSearchChecked} onChange={onChange}></input>
                </div> */}
            </div>
        </form>
    )
}

export default FormContainer