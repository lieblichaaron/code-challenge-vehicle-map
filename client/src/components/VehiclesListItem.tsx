import React from "react";
import { Vehicle } from "../utils/vehicle";
import './VehiclesListItem.css'

const VehiclesListItem = ({ vehicle, onClick, chosen }: { vehicle: Vehicle; onClick: Function; chosen: boolean }) => {
    return (
        <button style={{ backgroundColor: chosen ? 'grey' : undefined }} className='list-item' onClick={() => onClick(vehicle)} >
            <div>Id: {vehicle.vehicle_id}</div>
            <div>State: {vehicle.state}</div>
            <div>Class: {vehicle.class_name}</div>
        </button>
    )
}

export default VehiclesListItem;