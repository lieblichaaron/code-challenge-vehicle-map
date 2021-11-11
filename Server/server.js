require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const dbConnection = require('./DBconnection')
const port = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors(corsOptions))
app.use(express.json())

const VehicleRoutes = require('./routes/vehicles')

app.use('/vehicles', VehicleRoutes)

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
