import React, { useEffect, useState } from "react";
import { Vehicle } from "../utils/vehicle";
import './VehicleCard.css'
import Geocode from "react-geocode";
import { ReactComponent as YourSvg } from '../car.svg';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY ? process.env.REACT_APP_GOOGLE_API_KEY : '')
const VehicleCard = ({ vehicle }: { vehicle?: Vehicle }) => {
    const [location, setLocation] = useState()

    useEffect(() => {
        if (vehicle) {
            Geocode.fromLatLng(`${vehicle.lat}`, `${vehicle.lng}`).then(
                (response) => {
                    setLocation(response.results[0].formatted_address)
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, [vehicle])

    return (
        <div className='card-container'>
            {vehicle && location && <div className='card'>
                <YourSvg width='40%' height='100%' />
                <div style={{ width: '60%', margin: 'auto 0' }}>
                    <div className='car-info'>Vehicle Id: {vehicle.vehicle_id}</div>
                    <div className='car-info'>State: {vehicle.state}</div>
                    <div className='car-info'>Seats: {vehicle.seats}</div>
                    <div className='car-info'>Class: {vehicle.class_name}</div>
                    <div className='car-info'>Location: {location}</div>
                </div>
            </div>}
        </div>
    )
}

export default VehicleCard;