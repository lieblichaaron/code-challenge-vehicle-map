const express = require("express");
const router = express.Router();

const {
    getAllVehiclesLocations,
    getVehiclesFromSelectedArea,
  } = require("../controllers/vehicleCtrlr");
  

router.get("", getAllVehiclesLocations);

router.get("/selectedArea", getVehiclesFromSelectedArea);

module.exports = router;