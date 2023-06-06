
import styled from "styled-components"

const CardDisplay = ({weather}) => {



        //checks the total severity for the 3 hours prior do hour
    const checkPrevHours = weather.slice(0,3).reduce((total,element)=>total+element.severity,0)
    //const checkArrPrevHours = arrivalsWithWeathercodes.slice(0,3).reduce((total,element)=>total+element.severity,0)

    


    return (
        <CardContainer id="card-container">
            <div id="basic-information">
            <img src="./images/"/>
            <p>{weather[3].description}</p>
            <p>{weather[3].temp}</p>
            </div>
            <div id="chance-display">
            <p>{weather[3].hour}</p>
            </div>
        </CardContainer>
  
    )
    
}

const CardContainer = styled.div`
border:solid thin black;
display:flex;
`

export default CardDisplay