import { useEffect,useState } from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import NavContainer from "./containers/NavContainer";
import FooterContainer from "./containers/FooterContainer";
import styled from 'styled-components'
import Home from "./pages/Home";
import About from "./pages/About";
import ExternalServices from "./services/ExternalServices";

function App() {

  const [formObj, setFormObj] = useState([]) //returns from form submit
  const [geoList, setGeoList] = useState([]) //returns from GEO API
  const [geoObj, setGeoObj] = useState([]) // returns from form submit
  const [departureForecast, setDepartureForecast] = useState([]) // returns from METEOAPI
  const [arrivalForecast, setArrivalForecast] = useState([]) // TODO: consider refactoring this into one bit of state with the above if they are ALWAYS being updated at the same time.
  const [savedSearch, setSavedSearch] = useState([])
  const [savedSearchList, setSavedSearchList] = useState([])


useEffect(()=>{
  //may need to use promise.all (waits for all promises to be complete to do the thing it's meant to do)
  //TODO: Consider refactoring to one function 
  ExternalServices.getDepartureForecast(geoObj)
  .then(res => setDepartureForecast(res))
  ExternalServices.getArrivalForecast(geoObj)
  .then(res => setArrivalForecast(res))
  const compliedDepatureForecast = departureForecast.hourly.time.map((hour,index) => {
    return {hour : hour, temp : departureForecast.hourly.temperature_2m[index], code : departureForecast.weathercode[index] }
  })
},[geoObj])


  return (
    <Router>
    <NavContainer/>
      <Routes>
        <Route path="/" element={<Home 
        geoList={geoList}
        departureForecast={departureForecast}
        arrivalForecast={arrivalForecast}
        geoObj={geoObj}
        setGeoObj={setGeoObj} 
        setGeoList={setGeoList}
        />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
