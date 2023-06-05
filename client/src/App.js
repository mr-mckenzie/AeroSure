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
  const [geoObj, setGeoObj] = useState([]) // selected from geoList dropdown
  const [forecast, setForecast] = useState([]) // returns from METEOAPI
  const [savedSearch, setSavedSearch] = useState([])
  const [savedSearchList, setSavedSearchList] = useState([])

// useEffect(()=>{
//   console.log("USE EFFECT RUNNING")
//   ExternalServices.getGeoList("xxxxx")
//   .then(data => setGeoList(data))
// },[])

  // const parsed = returnData.map((item) => {
  //   return <p>{item.name}</p>
  // })
  return (
    <Router>
    <NavContainer/>
      <Routes>
        <Route path="/" element={<Home geoList={geoList} setGeoObj={setGeoObj} setGeoList={setGeoList}/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
