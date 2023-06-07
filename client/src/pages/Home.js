import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"

const Home = ({geoList, setGeoList, setGeoObj,forecast,geoObj,runForecast, setSavedSearchList}) => {

    return (
        <>
            <FormContainer runForecast={runForecast} geoList={geoList} setGeoList={setGeoList} setGeoObj={setGeoObj} setSavedSearchList={setSavedSearchList}/>
            <DisplayContainer geoObj={geoObj} forecast={forecast} />        
        </>
    )
}

export default Home