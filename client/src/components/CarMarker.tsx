import React from "react";
import { Vehicle } from "../utils/vehicle";

const CarMarker = ({ onClick, vehicle, $hover, chosen }: { vehicle: Vehicle; lat: number; lng: number; $hover?: boolean; onClick: Function; chosen: boolean }) => {
    const vehicleColor = vehicle.state === 'online' ? 'green' : 'red'
    return (
        <button
            style={{
                height: '25px',
                width: '25px',
                backgroundColor: chosen ? vehicleColor : $hover ? vehicleColor : 'blue',
                borderRadius: '100px',
                color: 'white',
                position: 'absolute',
                left: -15,
                top: -15,
            }}
            onClick={() => onClick(vehicle)}>
        </button>
    )
};

export default CarMarker;