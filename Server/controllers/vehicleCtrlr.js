const dbConnection = require('../DBconnection')
const classifyPoint = require("robust-point-in-polygon")

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
  const polygon = req.body
  dbConnection.query(`SELECT * FROM vehicles JOIN vehicle_location ON vehicles.vehicle_id = vehicle_location.vehicle_id`, (err, rows, fields) => {
    if (!err) {
      const vehicles = []
      rows.forEach((vehicle) => {
        if (classifyPoint(polygon, [vehicle.lat, vehicle.lng]) !== 1) {
          vehicles.push(vehicle)
        }
      })
      res.send(vehicles)
    } else {
      console.log(err)
    }
  })

};

module.exports = {
  getAllVehicles,
  getVehiclesFromSelectedArea
}