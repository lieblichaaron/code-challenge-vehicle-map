import React, { useEffect, useState } from "react";
import { Vehicle } from "../utils/vehicle";
import './VehicleCard.css'
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY ? process.env.REACT_APP_GOOGLE_API_KEY : '')
const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
    const [location, setLocation] = useState()

    useEffect(() => {
        Geocode.fromLatLng(`${vehicle.lat}`, `${vehicle.lng}`).then(
            (response) => {
                setLocation(response.results[0].formatted_address)
            },
            (error) => {
                console.error(error);
            }
        );
    }, [vehicle])

    return (
        <div className='card-container'>
            {location && <div className='card'>
                <div>Vehicle Id: {vehicle.vehicle_id}</div>
                <div>State: {vehicle.state}</div>
                <div>Seats: {vehicle.seats}</div>
                <div>Class: {vehicle.class_name}</div>
                <div>Location: {location}</div>
            </div>}
        </div>
    )
}

export default VehicleCard;