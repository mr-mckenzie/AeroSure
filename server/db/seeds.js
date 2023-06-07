use user_searches;
db.dropDatabase();

db.flights.insertMany([
  {
    departureString: "Edinburgh",
    departureDate : "2023-06-08",
    departureTime : "10:15",
    arrivalString : "Calgary",
    arrivalDate : "2023-06-08",
    arrivalTime : "10:30",
    departureLatitude : 55.95206,
    departureLongitude : -3.19648,
    arrivalLatitude : 51.05011,
    arrivalLongitude : -114.08529
  },
  {
    departureString: "Kathmandu",
    departureDate : "2023-06-14",
    departureTime : "06:13",
    arrivalString : "Lukla",
    arrivalDate : "2023-06-14",
    arrivalTime : "06:43",
    departureLatitude : 27.70169,
    departureLongitude : 85.3206,
    arrivalLatitude : 27.68664,
    arrivalLongitude : 86.7314
  }
]);