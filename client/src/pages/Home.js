import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"

const Home = ({ setGeoObj, forecast, geoObj, runForecast, setSavedSearchList }) => {

    return (
        <div>
            <FormContainer runForecast={runForecast} setGeoObj={setGeoObj} setSavedSearchList={setSavedSearchList} />
            <DisplayContainer geoObj={geoObj} forecast={forecast}/>
        </div>
    )
}

export default Home