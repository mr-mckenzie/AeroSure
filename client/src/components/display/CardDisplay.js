import "./CardDisplay.css"
import styled from "styled-components"
import "./CardDisplay.css"
import { checkSeverity, getImageDetails } from "../utilities/weatherFunctions"

const CardDisplay = ({ weather }) => {

    const severity = checkSeverity(weather)
    const severityString = severity.string
    const cardColour = severity.colour
    
    //The weather for the current window is stored at index 3. 0-2 are the previous 3 hrs which are used to estimate any knock-on delays/cancellations
    const weatherNow = weather[3]
    const weatherCode = weatherNow.code

    const imageDetails = getImageDetails(weatherCode)
    const weatherImage = imageDetails.image
    const spin = imageDetails.spin

    return (
        <CardContainer id="card-container" className={cardColour}>
            <div className="card">
                <img className={spin} src={weatherImage} />
                <div className="basic-information" id="basic-information">
                    <p>{weatherNow.temp}°C</p>
                    <p>{weatherNow.description}</p>
                </div>
                <div className="chance-display">
                    <p>{weatherNow.hour.slice(-5)}</p>
                    <p>{severityString}</p>
                </div>
            </div>
        </CardContainer>
    )
}

const CardContainer = styled.div`
display:flex;
width:45vw;
height:auto;
margin:10px;
border-radius:10px;
`

export default CardDisplay