import React from "react";
import { Vehicle } from "../utils/vehicle";
import './VehicleCard.css'

const VehicleCard = ({vehicle}: {vehicle: Vehicle}) => {
    return (
        <div className='card-container'>
        <div className='card'>
            <div>Vehicle Id: {vehicle.vehicle_id}</div>
            <div>State: {vehicle.state}</div>
            <div>Seats: {vehicle.seats}</div>
            <div>Class: {vehicle.class_name}</div>
            </div>
        </div>
    )
}

export default VehicleCard;