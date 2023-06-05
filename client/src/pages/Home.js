import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"

const Home = ({geoList, setGeoList, setGeoObj,arrivalForecast,departureForecast,geoObj}) => {

    return (
        <>
            <FormContainer geoList={geoList} setGeoList={setGeoList} setGeoObj={setGeoObj}/>
            <DisplayContainer geoObj={geoObj} arrivalForecast={arrivalForecast} departureForecast={departureForecast}/>        
        </>
    )
}

export default Home