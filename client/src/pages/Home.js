import DisplayContainer from "../containers/DisplayContainer"
import FormContainer from "../containers/FormContainer"

const Home = ({geoList}) => {

    return (
        <>
            <FormContainer geoList={geoList}/>
            <DisplayContainer/>        
        </>
    )
}

export default Home