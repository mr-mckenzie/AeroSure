import "./CardDisplay.css"
import styled from "styled-components"
import "./CardDisplay.css"
import sun from "./images/sunIcon.png"
import rain from "./images/rainIcon.png"
import cloud from "./images/cloudIcon.png"
import snow from "./images/snowIcon.png"
import thunder from "./images/thunderstormIcon.png"

const CardDisplay = ({weather}) => {

    let severityString = ""


    // console.log({weather})
    const sev = weather.slice(0,3).reduce((total,current) => 
         total+current.severity,0)

    const checkSev = () => {
    if (sev <=3 ) {
        severityString = "Low chances of delay / cancellation of flight"
        return "card-green"
    } else if (sev < 6) {
        severityString = "Moderate chances of delay / cancellation of flight"
        return "card-yellow"
    } else {
        severityString = "High chances of delay / cancellation of flight"
        return "card-red"
    }
}   
    const sunnyArray = [0,1]
    const cloudArray = [2,3,45,48]
    const rainArray = [51,53,55,56,57,61,63,65,66,67,80,81,82]
    const snowArray = [71,73,75,77,85,86]
    const thunderArray = [95,96,99]
    
    // console.log(weather[3])
 
    // const checkImg = () => {
        let myImg
        let spin
        const weatherCode = weather[3].code 
        // console.log({weatherCode})
        if (sunnyArray.includes(weatherCode)) {
            myImg = sun
            spin = "rotate-image"
        } else if (cloudArray.includes(weatherCode)) {
            myImg = cloud
            spin = "card-image"
        } else if (rainArray.includes(weatherCode)) {
            myImg =  rain
            spin = "card-image"
        } else if (snowArray.includes(weatherCode)) {
            myImg =  snow
            spin = "rotate-image"
        } else if (thunderArray.includes(weatherCode)) {
            myImg =  thunder
            spin = "card-image"
        }


        
    return (
        <CardContainer id="card-container" className={checkSev()}>
            <div className="card">
                <img className={spin} src={myImg} /> 
                <div className="basic-information" id="basic-information">
                    <p>{weather[3].temp}°C</p>
                    <p>{weather[3].description}</p>
                </div>
                <div id="chance-display">
                    <p>{weather[3].hour.slice(-5)}</p>

                    <p>{severityString}</p>
                </div>
            </div>
        </CardContainer>
  
    )
    
}

const CardContainer = styled.div`
display:flex;
/* padding:5px; */
width:45vw;
height:auto;
margin:10px;
border-radius:10px;
`

export default CardDisplay