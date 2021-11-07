require('dotenv').config()
const express = require('express');
const app = express();
const dbConnection = require('./DBconnection')
const port = process.env.PORT || 5000;

const VehicleRoutes = require('./routes/vehicles')

app.use('/vehicles', VehicleRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`));
