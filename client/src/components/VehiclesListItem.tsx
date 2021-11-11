import React, { useEffect } from "react";
import { Vehicle } from "../utils/vehicle";
import './VehiclesListItem.css'
export const listItemMargin = 10;

const VehiclesListItem = ({ vehicle, onClick, chosen, scrollToVehicle, index }: { vehicle: Vehicle; onClick: Function; chosen: boolean; scrollToVehicle: Function; index: Number }) => {
    useEffect(() => {
        if (chosen) {
            scrollToVehicle(index)
        }
    }, [chosen, index, scrollToVehicle])
    return (
        <button style={{ backgroundColor: chosen ? 'grey' : undefined, margin: `${listItemMargin}px auto` }} className='list-item' onClick={() => onClick(vehicle)} >
            <div>Id: {vehicle.vehicle_id}</div>
            <div>State: {vehicle.state}</div>
            <div>Class: {vehicle.class_name}</div>
        </button>
    )
}

export default VehiclesListItem;