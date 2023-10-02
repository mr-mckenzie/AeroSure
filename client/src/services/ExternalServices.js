const ExternalServices = {

  getGeoList(location) {

    if (location) {
      const resultOfFetch = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`)
        .then(data => data.json())
        .then(returnOfJson => returnOfJson.results)
        .catch((error) => {
          console.log(error)
        })

      return resultOfFetch
    }
  },


  getForecast(Obj) {
    const departureForecast = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Obj.departureLatitude}&longitude=${Obj.departureLongitude}&hourly=temperature_2m,weathercode&past_days=1&forecast_days=16`).then(data => data.json())
    const arrivalForecast = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Obj.arrivalLatitude}&longitude=${Obj.arrivalLongitude}&hourly=temperature_2m,weathercode&past_days=1&forecast_days=16`).then(data => data.json())
    return Promise.all([departureForecast, arrivalForecast])
  },
}
export default ExternalServices;