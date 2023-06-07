import mateoimg from '../components/display/images/mateoapipredictiondescription.png';

const About = () => {

    return (
        <> 
        <h2 className="about-header">Our Objectives</h2> 
        <p id="mvp-description">This is no ordinary weather app! Aersure takes in a user's departure and arrival flight, alongside the details of flight time and location. Then with the help of open-mateo API, we generate the weather data for both departure and arrival and predict the likelihood of that weather affecting the flight departure a few hours around input time. You can also view the weather of the arrival destination in the chosen timeframe.</p>
        <h2 className="about-header">How do our predictions work?</h2>
        <img id="background" src={mateoimg} alt="weather codes from open-mateo api"></img>
        <p id="prediction-description">open-mateo API provides us a key of weather interpretation codes which specifies the category the weather is in. Using these codes, we created our own model where we categorised each weathercode into 3 groups - low, medium and high probability that the users flight may get delayed or cancelled due to weather.</p>
        <p id="weathercode-example">E.g. code 71 is low probability, 73 is medium probability and 75 is high probability of flight delays/ cancellations</p>
        </>
    )
}

export default About