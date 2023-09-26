import meteoImg from '../static/images/meteoPredictionDescription.png';
import "./about.css"

const About = () => {

    return (
        <>
            <h2 className="about-header">Our Objectives</h2>
            <p className="mvp-description">This is no ordinary weather app! AeroSure takes in a user's departure and arrival flight, alongside the details of flight time and location. Then with the help of <a href="https://open-meteo.com/" target="_blank">Open-Meteo.com</a> APIs, we generate the weather data for both departure and arrival and predict the likelihood of that weather affecting the flight departure a few hours around input time.</p>
            <h2 className="about-header">How do our predictions work?</h2>

            <p className="mvp-description">We retrieve an hourly forecast for each of the user entered locations from the <a href="https://open-meteo.com/" target="_blank">Open-Meteo.com</a> Forecast API. Each hourly window in the forecast is assigned a numerical code which specifies the category, and therefore the severity, of the weather during that hour. The codes follow the The World Meteorological Organisation (WMO) weather interpretation codes (see table below). Using these codes as a basis, we created our own model which takes into account not only the exact departure time, but also a three hour window prior to departure where previous poor weather could cause further knock-on delays/cancellation may affect. We then categorise each of these four hour weather windows using our own traffic light system - i.e. low, medium and high probability that a flight may get delayed or cancelled due to weather.</p>
            <p id="weathercode-example">As an example code 3 relates to overcast conditions, therefore there is no danger to air travel and it is asssigned a low probability of delay/cancellation. Code 67 on the other hand represents heavy freezing rain which is dangerous to air travel and is assigned a high probability of flight delays/cancellations</p>
            <div className="meteo-image-container">
                <img id="meteocodes" src={meteoImg} alt="weather codes from open-meteo api"></img>
            </div>
            <div id="citations">
                <h2 className="about-header">Citations</h2>
                <p>AeroSure? is powered by <a href="https://open-meteo.com/" target="_blank">Open-Meteo's</a> Geolocation and Forecast APIs. This app is a student project and is non-commercial.</p>
                <a href="https://open-meteo.com/en/license"> Link to licence</a>
                <p>Open-Meteo.com API data are offered under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Attribution 4.0 International (CC BY 4.0)</a></p>
            </div>
        </>
    )
}

export default About