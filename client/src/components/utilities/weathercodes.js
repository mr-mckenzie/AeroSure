const weatherCodes = [
    { code: 0, description: "clear sky", severity: 1 },
    { code: 1, description: "mainly clear", severity: 1 },
    { code: 2, description: "partly cloudy", severity: 1 },
    { code: 3, description: "overcast", severity: 1 },
    { code: 45, description: "fog", severity: 2 },
    { code: 48, description: "depositing rime fog", severity: 2 },
    { code: 51, description: "light drizzle", severity: 1 },
    { code: 53, description: "moderate drizzle", severity: 1 },
    { code: 55, description: "dense drizzle", severity: 1 },
    { code: 56, description: "light freezing drizzle", severity: 2 },
    { code: 57, description: "dense freezing drizzle", severity: 3 },
    { code: 61, description: "slight rain", severity: 1 },
    { code: 63, description: "moderate rain", severity: 1 },
    { code: 65, description: "heavy rain", severity: 2 },
    { code: 66, description: "light freezing rain", severity: 3 },
    { code: 67, description: "heavy freezing rain", severity: 3 },
    { code: 71, description: "slight snowfall", severity: 2 },
    { code: 73, description: "moderate snowfall", severity: 2 },
    { code: 75, description: "heavy snowfall", severity: 3 },
    { code: 77, description: "snow grains", severity: 2 },
    { code: 80, description: "slight rain showers", severity: 1 },
    { code: 81, description: "moderate rain showers", severity: 1 },
    { code: 82, description: "violent rain showers", severity: 2 },
    { code: 85, description: "slight snow showers", severity: 2 },
    { code: 86, description: "heavy snow showers", severity: 3 },
    { code: 95, description: "thunderstorm", severity: 3 },
    { code: 96, description: "thunderstorm with slight hail", severity: 3 },
    { code: 99, description: "thunderstorm with heavy hail", severity: 3 }
]

export default weatherCodes