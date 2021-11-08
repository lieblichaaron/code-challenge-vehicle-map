const dbConnection = require('../DBconnection')

const getAllVehicles = async (req, res) => {
    dbConnection.query("SELECT * FROM vehicles JOIN vehicle_location ON vehicles.vehicle_id = vehicle_location.vehicle_id", (err, rows, fields) => {
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
    getAllVehicles,
      getVehiclesFromSelectedArea
  }