import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"

const Home = ({geoList, setGeoList, setGeoObj}) => {

    return (
        <>
            <FormContainer geoList={geoList} setGeoList={setGeoList} setGeoObj={setGeoObj}/>
            <DisplayContainer/>        
        </>
    )
}

export default Home