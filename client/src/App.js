import { useEffect,useState } from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import NavContainer from "./containers/NavContainer";
import FooterContainer from "./containers/FooterContainer";
import styled, { createGlobalStyle } from 'styled-components'
import Home from "./pages/Home";
import About from "./pages/About";
import ExternalServices from "./services/ExternalServices";
import {getFlights, getflight} from "./services/InternalServices";

function App() {

  const [geoObj, setGeoObj] = useState({
    departureLongitude:10.00,
    departureLatitude:10.00,
    arrivalLongitude:10.00,
    arrivalLatitude:10.00
  }) // returns from form submit

  const [savedSearch, setSavedSearch] = useState([])
  const [savedSearchList, setSavedSearchList] = useState([])

  //use effect runs on startup to populate saved searches from server
  useEffect(() => {
    getFlights().then((returnedFlights) => {
      setSavedSearchList(returnedFlights)
    })
}, [])

  const [rawForecast,setRawForecast] = useState({
    departure:{},
    arrival:{},
  }) // returns from METEOAPI

  const [forecast,setForecast] = useState({
      departure:{},
      arrival:{},
  })

 const runForecast = ((geoObj)=>{

    ExternalServices.getForecast(geoObj)
    .then(res => {
      let newForecast ={
        departure:res[0].hourly,
        arrival:res[1].hourly
      }
      setRawForecast(newForecast)
    return newForecast})
    .then( newForecast => {
      let compiledDepartureForecast
      let compiledArrivalForecast
      //ISSUE HERE V
        compiledDepartureForecast = newForecast.departure.time.map((hour,index) => {
          return {hour : hour, temp : newForecast.departure.temperature_2m[index], code : newForecast.departure.weathercode[index] }})
        compiledArrivalForecast = newForecast.arrival.time.map((hour,index) => {
          return {hour : hour, temp : newForecast.arrival.temperature_2m[index], code : newForecast.arrival.weathercode[index] }})
      
      
      setForecast({
        departure:compiledDepartureForecast,
        arrival:compiledArrivalForecast})
    })
  })

  return (
    <Router>
    <NavContainer setSavedSearch={setSavedSearch} savedSearchList={savedSearchList} setGeoObj={setGeoObj} runForecast={runForecast}/>
      <Routes>
        <Route path="/" element={<Home 
        forecast={forecast}
        geoObj={geoObj}
        setGeoObj={setGeoObj} 
        runForecast={runForecast}
        setSavedSearchList={setSavedSearchList}
        />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
