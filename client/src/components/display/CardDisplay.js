import "./CardDisplay.css"
import styled from "styled-components"

const CardDisplay = ({weather}) => {

    
    console.log({weather})
    const sev = weather.slice(0,3).reduce((total,current) => 
         total+current.severity,0)

    const checkSev = () => {
    if (sev <=3 ) {
        return "card-green"
    } else if (sev < 6) {
        return "card-yellow"
    } else {
        return "card-red"
    }
}

    console.log({sev})
    return (
        <CardContainer id="card-container" className={checkSev()}>
            <div id="basic-information">
            <img src="./images/"/>
            <p>{weather[3].description}</p>
            <p>{weather[3].temp}°C</p>
            </div>
            <div id="chance-display">
            <p>{weather[3].hour}</p>
            </div>
        </CardContainer>
  
    )
    
}

const CardContainer = styled.div`
display:flex;
padding:3px;
width:45vw;
height:10rem;
margin:10px;
border-radius:10px;
`

export default CardDisplay