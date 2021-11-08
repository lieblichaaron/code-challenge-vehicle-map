const express = require("express");
const router = express.Router();

const {
  getAllVehicles,
    getVehiclesFromSelectedArea,
  } = require("../controllers/vehicleCtrlr");
  

router.get("", getAllVehicles);

router.get("/selectedArea", getVehiclesFromSelectedArea);

module.exports = router;