
//WE WANT THIS TO BE RESPONSIBLE FOR GETTING OUR GEOLIST AND SETTING THE STATE 

const ExternalServices =  {

  getGeoList (location) {

    // console.log("Location inside getGeoList:", location)

    if (location) {
      const resultOfFetch = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`)
      .then(data => data.json())
      .then(returnOfJson => returnOfJson.results)
      .catch((error) => {
      })
      
    //   if ((resultOfFetch).then()){
      return resultOfFetch
    // } else {
    //   console.log("NOPE")
    // }
    // } else {
    //   return {"results": [{id:"999999999", name:"no results"}]}
    // }
}},

   getDepartureForecast (departureObj) {
    const departureForecast = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${departureObj.departureLatitude}&longitude=${departureObj.departureLongitude}&hourly=temperature_2m,weathercode`)
    .then(data => data.json())
    return departureForecast},

   getArrivalForecast (arrivalObj) {
    const arrivalForecast = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${arrivalObj.arrivalLatitude}&longitude=${arrivalObj.arrivalLongitude}&hourly=temperature_2m,weathercode`)
    .then(data => data.json())
    return arrivalForecast}
}

export default ExternalServices;