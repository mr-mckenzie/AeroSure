import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"

const Home = ({geoList, setGeoList, setGeoObj,forecast,geoObj,runForecast}) => {

    return (
        <>
            <FormContainer runForecast={runForecast} geoList={geoList} setGeoList={setGeoList} setGeoObj={setGeoObj}/>
            <DisplayContainer geoObj={geoObj} forecast={forecast} />        
        </>
    )
}

export default Home