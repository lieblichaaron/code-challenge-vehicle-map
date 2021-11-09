import React from "react";
import { Vehicle } from "../utils/vehicle";

const CarMarker = ({ onClick, vehicle, $hover, chosen }: { vehicle: Vehicle; lat: number; lng: number; $hover?: boolean; onClick: Function; chosen: boolean }) => {
    const vehicleColor = vehicle.state === 'online' ? 'green' : 'red'
    return (
        <button
            style={{
                height: '50px',
                width: '50px',
                backgroundColor: chosen ? vehicleColor : $hover ? vehicleColor : 'blue',
                borderRadius: '100px',
                color: 'white',
                position: 'absolute',
                left: -30,
                top: -30,
            }}
            onClick={() => onClick(vehicle)}>
            {vehicle.state}
        </button>
    )
};

export default CarMarker;