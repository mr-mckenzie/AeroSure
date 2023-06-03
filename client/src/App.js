import { useEffect,useState } from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import NavContainer from "./containers/NavContainer";
import FormContainer from "./containers/FormContainer";
import DisplayContainer from "./containers/DisplayContainer";
import FooterContainer from "./containers/FooterContainer";
import styled from 'styled-components'
import Home from "./pages/Home";

function App() {

  const [formObj, setFormObj] = useState([]) //returns from form submit
  const [geoList, setGeoList] = useState([]) //returns from GEO API
  const [geoObj, setGeoObj] = useState([]) // selected from geoList dropdown
  const [forecast, setForecast] = useState([]) // returns from METEOAPI
  const [savedSearch, setSavedSearch] = useState([])
  const [savedSearchList, setSavedSearchList] = useState([])

// useEffect(()=>{
// fetch("https://geocoding-api.open-meteo.com/v1/search?name=Edinburgh&count=10&language=en&format=json")
// .then(data => data.json())
// .then(data => setReturnData(data.results))
// },[])

  // const parsed = returnData.map((item) => {
  //   return <p>{item.name}</p>
  // })
  return (
    <Router>
    <NavContainer/>
      <Routes>
        <Route path="/" element={<Home/>}>

        </Route>
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
