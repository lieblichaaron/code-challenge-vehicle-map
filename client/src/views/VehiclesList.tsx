import React from 'react';
import VehiclesListItem from '../components/VehiclesListItem';
import { Vehicle } from '../utils/vehicle';
import './VehicleList.css'

const VehiclesList = ({ vehicles, setChosenVehicle, chosenVehicle }: { vehicles: Vehicle[]; setChosenVehicle: Function; chosenVehicle: Vehicle }) => {
    return (
        <div className='list-container'>
            {vehicles.map((vehicle) => {
                return (
                    <VehiclesListItem key={vehicle.vehicle_id} vehicle={vehicle} onClick={setChosenVehicle} chosen={vehicle.vehicle_id === chosenVehicle.vehicle_id} />
                )
            })}
        </div>
    )
}

export default VehiclesList;