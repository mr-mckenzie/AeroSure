import "./about.css"
import prediction from "../static/images/prediction.jpeg"

const About = () => {

    return (
        <div className="about-content">
            <h2 className="header">Overview</h2>
            <p>This is no ordinary weather app! <i>AeroSure</i> takes a user's departure and arrival location, alongside the details of flight time and date. Then with the help of <a href="https://open-meteo.com/" target="_blank">Open-Meteo.com</a> APIs, we gather weather data and predict the likelihood of that weather affecting the flight.</p>
            <h2 className="header">How do our predictions work?</h2>
            <p>We retrieve an hourly forecast for the arrival and departure locations from the Open-Meteo.com Forecast API. Each hourly window in the forecast is assigned a numerical code which specifies the category, and therefore the severity, of the weather during that hour. The codes follow the The World Meteorological Organisation (WMO) weather interpretation codes (see table below). </p> 
            <p>Using these codes as a basis, we created a model which takes into account not only the hour of the departure time, but also a three-hour window prior to departure. This covers any situations where previous poor weather conditions could cause knock-on delays/cancellations. We then categorise each of these four-hour weather windows using a traffic light system (i.e. low, medium and high probability that a flight may get delayed or cancelled due to weather) and display these windows to the user.</p>
            <div className="code-table-container">
                <h3>Weather interpretation codes</h3>
                <table className='code-table'>
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>Clear sky</td>
                        </tr>
                        <tr>
                            <td>1, 2, 3</td>
                            <td>Mainly clear, partly cloudy, overcast</td>
                        </tr>
                        <tr>
                            <td>45, 48</td>
                            <td>Fog, depositing rime fog</td>
                        </tr>
                        <tr>
                            <td>51, 53, 55</td>
                            <td>Drizzle: light, moderate, dense</td>
                        </tr>
                        <tr>
                            <td>56, 57</td>
                            <td>Freezing drizzle: light, dense</td>
                        </tr>
                        <tr>
                            <td>61, 63, 65</td>
                            <td>Rain: slight, moderate, heavy</td>
                        </tr>
                        <tr>
                            <td>66, 67</td>
                            <td>Freezing rain: light, heavy</td>
                        </tr>
                        <tr>
                            <td>71, 73, 75</td>
                            <td>Snow fall: slight, moderate, heavy</td>
                        </tr>
                        <tr>
                            <td>77</td>
                            <td>Snow grains</td>
                        </tr>
                        <tr>
                            <td>80, 81, 82</td>
                            <td>Rain showers: slight, moderate, violent</td>
                        </tr>
                        <tr>
                            <td>85, 86</td>
                            <td>Snow showers: slight, heavy</td>
                        </tr>
                        <tr>
                            <td>95</td>
                            <td>Thunderstorm: slight or moderate</td>
                        </tr>
                        <tr>
                            <td>96, 99</td>
                            <td>Thunderstorm: with slight hail, with heavy hail</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p id="weathercode-example">As an example, code 2 represents partly cloudy conditions. This is unlikely to cause disruption to air travel and is assigned a low probability of delay/cancellation. Code 67 on the other hand represents heavy freezing rain which is highly dangerous for aircraft and is assigned a high probability of flight delays/cancellations.</p>
            <p>Note that due to the limitations of weather predictions, <i>AeroSure</i> can only provide coverage for flights within 15 days of the current date.</p>
            <h2 className="header">Example prediction</h2>
            <img id="prediction-image" src={prediction}></img>
            <p>Let's look at the above example flight from JFK to LAX. The departure from New York City seems unlikely to be affected by weather because it will be overcast (i.e. safe conditions for take-off). However, turning now to the arrival in Los Angeles, we can see that fog is predicted at the scheduled arrival time and remains for another hour until clearing up. Foggy conditions can present a problem for aircraft therefore any flights scheduled in the hour of 14:00 or 15:00 are given a high likelihood of being delayed or cancelled. Looking further ahead to 16:00, two hours after the scheduled arrival, we can see that the weather is forecast to be clear. Despite the good conditions at that time, it is possible that the previous predicted disruption due is causing knock-on delays or cancellations. Taking both the departure and arrival conditions into account we can say that this flight is likely to be delayed due to adverse weather.</p>
            <div id="thanks">
                <h2 className="header">Acknowledgements</h2>
                <p><i>AeroSure</i> is non-commercial and makes use of <a href="https://open-meteo.com/" target="_blank">Open-Meteo's</a> Geolocation and Forecast APIs.</p>
                <p>Open-Meteo.com API data are offered under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Attribution 4.0 International (CC BY 4.0)</a> and covered by the following <a href="https://open-meteo.com/en/license"> licence</a>.</p>
            </div>
            <div id="disclaimer">
                <h2 className="header">Disclaimer</h2>
                <p><i>AeroSure</i> is a student project with the aim of creating a full-stack React app incorporating API requests.</p>
                <p>This app is purely an exercise in programming and <b>should not</b> be used for predicting any real-life flight delays or cancellations.</p> 
                <p>We are neither weather nor aviation experts and therefore <b>cannot guarantee the accuracy of any predictions made</b> by <i>AeroSure</i>.</p>
                <p><b>Do not</b> make any real-life descisions based on an <i>AeroSure</i> flight predition.</p>
                <p>We <b>cannot be held responsible</b> for any resulting outcome of using this app.</p>
            </div>
        </div>
    )
}

export default About