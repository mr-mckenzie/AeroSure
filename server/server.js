const express = require('express');
const app = express();

const cors = require("cors");

app.use(cors())

app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('user_searches');
    const searchCollection = db.collection('flights');
    const searchRouter = createRouter(searchCollection);

    app.post('/api/search', (req, res) => {
      const newData = req.body;
      if (newData.hasOwnProperty("departureName") && 
          newData.hasOwnProperty("departureDate") && 
          newData.hasOwnProperty("departureTime") && 
          newData.hasOwnProperty("departureLatitude") && 
          newData.hasOwnProperty("departureLongitude") && 
          newData.hasOwnProperty("arrivalName") && 
          newData.hasOwnProperty("arrivalDate") && 
          newData.hasOwnProperty("arrivalTime") && 
          newData.hasOwnProperty("arrivalLatitude") && 
          newData.hasOwnProperty("arrivalLongitude")
          ) {
        searchCollection
          .insertOne(newData)
          .then((result) => {
            res.json(result.ops[0]);
          })
          .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({ status: 500, error: err });
          });
      } else {
        res.status(400);  // bad request
        res.send("Please make sure all fields in the form have been completed.");
      }
    });

    app.use('/api/search', searchRouter);
  })
  .catch(console.error);

app.listen(9000, function() {
  console.log(`Saved Flight server running on port ${this.address().port}`);
});