import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"
import "./background.css"

const Home = ({geoList, setGeoList, setGeoObj,forecast,geoObj,runForecast, setSavedSearchList}) => {

    return (
        <div className="center">
            <FormContainer runForecast={runForecast} geoList={geoList} setGeoList={setGeoList} setGeoObj={setGeoObj} setSavedSearchList={setSavedSearchList}/>
           { forecast && <DisplayContainer geoObj={geoObj} forecast={forecast} /> }      
        </div>
    )
}

export default Home