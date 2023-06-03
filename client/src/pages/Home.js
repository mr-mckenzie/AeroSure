import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"

const Home = ({geoList, setGeoList}) => {

    return (
        <>
            <FormContainer geoList={geoList} setGeoList={setGeoList}/>
            <DisplayContainer/>        
        </>
    )
}

export default Home