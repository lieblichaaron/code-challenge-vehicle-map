import React from 'react';
import VehiclesListItem from '../components/VehiclesListItem';
import { Vehicle } from '../utils/vehicle';
import './VehicleList.css'

const VehiclesList = ({vehicles, setChosenVehicle}: {vehicles: Vehicle[]; setChosenVehicle: Function}) => {
    return (
        <div className='list-container'>
        {vehicles.map((vehicle) => {
            return (
                <VehiclesListItem key={vehicle.vehicle_id} vehicle={vehicle} onClick={setChosenVehicle} />
            )
        })}
        </div>
    )
}

export default VehiclesList;