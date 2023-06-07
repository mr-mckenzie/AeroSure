import "./CardDisplay.css"
import styled from "styled-components"
import "./CardDisplay.css"
import sun from "../../sunIcon.png"
import rain from "../../rainIcon.png"
import cloud from "../../cloudIcon.png"
import snow from "../../snowIcon.png"
import thunder from "../../thunderstormIcon.png"

const CardDisplay = ({weather}) => {



    // console.log({weather})
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
    const sunnyArray = [0,1]
    const cloudArray = [2,3,45,48]
    const rainArray = [51,53,55,56,57,61,63,65,66,67,80,81,82]
    const snowArray = [71,73,75,77,85,86]
    const thunderArray = [95,96,99]
    
    // console.log(weather[3])

    // const checkImg = () => {
        let myImg
        const weatherCode = weather[3].code 
        // console.log({weatherCode})
        if (sunnyArray.includes(weatherCode)) {
            myImg = sun
        } else if (cloudArray.includes(weatherCode)) {
            myImg = cloud
        } else if (rainArray.includes(weatherCode)) {
            myImg =  rain
        } else if (snowArray.includes(weatherCode)) {
            myImg =  snow
        } else if (thunderArray.includes(weatherCode)) {
            myImg =  thunder
        }
        
    return (
        <CardContainer id="card-container" className={checkSev()}>
            <div className="card">
            <img className="card-image" src={myImg}/>   

                <div className="basic-information" id="basic-information">
                 <p>{weather[3].description}</p>
                    <p>{weather[3].temp}°C</p>
                </div>
                <div id="chance-display">
                    <p>{weather[3].hour.slice(-5)}</p>
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