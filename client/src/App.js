import { useEffect,useState } from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import NavContainer from "./containers/NavContainer";
import FooterContainer from "./containers/FooterContainer";
import Home from "./pages/Home";
import About from "./pages/About";
import ExternalServices from "./services/ExternalServices";
import {getFlights, getflight} from "./services/InternalServices";

function App() {

  const [geoObj, setGeoObj] = useState({}) // returns from form submit
  const [savedSearchList, setSavedSearchList] = useState([]) //saved searches

  //use effect runs on startup to populate saved searches from server
  // COMMENTED OUT BELOW CODE FOR ONLINE HOSTING WHERE SERVER SIDE IS NOT ACTIVE
  //   useEffect(() => {
  //     getFlights().then((returnedFlights) => {
  //       setSavedSearchList(returnedFlights)
  //     })
  // }, [])

  const [forecast,setForecast] = useState({
      departure:{},
      arrival:{},
  })

 const runForecast = ((geoObj)=>{

    ExternalServices.getForecast(geoObj)
    .then(result => {
      let newForecast ={
        departure:  result[0].hourly,
        arrival:    result[1].hourly
      }

    return newForecast})
    .then( newForecast => {
      let compiledDepartureForecast
      let compiledArrivalForecast
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
    <NavContainer savedSearchList={savedSearchList} setGeoObj={setGeoObj} runForecast={runForecast}/>
      <Routes>
        <Route path="/AeroSure" element={<Home 
        forecast={forecast}
        geoObj={geoObj}
        setGeoObj={setGeoObj} 
        runForecast={runForecast}
        setSavedSearchList={setSavedSearchList}
        />} />
        <Route path="/AeroSure/about" element={<About/>} />
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
