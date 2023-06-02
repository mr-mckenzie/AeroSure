import { useEffect,useState } from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import NavContainer from "./containers/NavContainer";
import FormContainer from "./containers/FormContainer";
import DisplayContainer from "./containers/DisplayContainer";
import FooterContainer from "./containers/FooterContainer";
import styled from 'styled-components'

function App() {

  const [returnData,setReturnData] = useState([])

useEffect(()=>{
fetch("https://geocoding-api.open-meteo.com/v1/search?name=Edinburgh&count=10&language=en&format=json")
.then(data => data.json())
.then(data => setReturnData(data.results))
},[])

  // const parsed = returnData.map((item) => {
  //   return <p>{item.name}</p>
  // })
  return (
    <div className="App">
      {/* {parsed} */}

      <NavContainer />
      {/* <FormContainer/> */}
      <DisplayContainer returnData={returnData}/>
      <FooterContainer/>
    </div>
  );
}

export default App;
