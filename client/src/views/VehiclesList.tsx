import React, { useRef } from 'react';
import VehiclesListItem, { listItemMargin } from '../components/VehiclesListItem';
import { Vehicle } from '../utils/vehicle';
import './VehicleList.css'

const VehiclesList = ({ vehicles, setChosenVehicle, chosenVehicle }: { vehicles: Vehicle[]; setChosenVehicle: Function; chosenVehicle?: Vehicle }) => {
    const listRef = useRef<any>(null)
    const scrollToVehicle = (index: number) => {
        listRef.current.scrollTo({
            top: index * ((window.innerWidth > 1000 ? 50 : 80) + listItemMargin),
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div ref={listRef} className='list-container'>
            {vehicles.map((vehicle, index) => {
                return (
                    <VehiclesListItem scrollToVehicle={scrollToVehicle} index={index} key={vehicle.vehicle_id} vehicle={vehicle} onClick={setChosenVehicle} chosen={chosenVehicle ? vehicle.vehicle_id === chosenVehicle.vehicle_id : false} />
                )
            })}
        </div>
    )
}

export default VehiclesList;