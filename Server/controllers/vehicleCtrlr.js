const dbConnection = require('../DBconnection')
const vehicles = require('../../vehicles-location.json')
const getAllVehiclesLocations = async (req, res) => {
    dbConnection.query("SELECT * FROM vehicle_location", (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            console.log(err)
        }
    })
  };

const getVehiclesFromSelectedArea = async (req, res) => {

  };

  module.exports = {
      getAllVehiclesLocations,
      getVehiclesFromSelectedArea
  }