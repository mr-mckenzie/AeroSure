import { useEffect,useState } from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import NavContainer from "./containers/NavContainer";
import FooterContainer from "./containers/FooterContainer";
import styled, { createGlobalStyle } from 'styled-components'
import Home from "./pages/Home";
import About from "./pages/About";
import ExternalServices from "./services/ExternalServices";

function App() {

  const [geoList, setGeoList] = useState([]) //returns from GEO API
  const [geoObj, setGeoObj] = useState({
    departureLongitude:10.00,
    departureLatitude:10.00,
    arrivalLongitude:10.00,
    arrivalLatitude:10.00
  }) // returns from form submit

  const [savedSearch, setSavedSearch] = useState([])
  const [savedSearchList, setSavedSearchList] = useState([])

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
    <NavContainer/>
      <Routes>
        <Route path="/" element={<Home 
        geoList={geoList}
        forecast={forecast}
        geoObj={geoObj}
        setGeoObj={setGeoObj} 
        setGeoList={setGeoList}
        runForecast={runForecast}
        />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
