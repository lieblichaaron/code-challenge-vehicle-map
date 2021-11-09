import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Vehicle } from '../utils/vehicle';
import CarMarker from '../components/CarMarker'

const Map = ({ vehicles, setChosenVehicle, chosenVehicle }: { vehicles: Vehicle[]; setChosenVehicle: Function; chosenVehicle: Vehicle }) => {

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY || '' }}
        center={{
          lat: chosenVehicle.lat,
          lng: chosenVehicle.lng
        }}
        defaultZoom={11}
        hoverDistance={25}
      >
        <CarMarker
          lat={chosenVehicle.lat}
          lng={chosenVehicle.lng}
          onClick={setChosenVehicle}
          vehicle={chosenVehicle}
          chosen={true}
        />
        {/* {vehicles.map((vehicle: Vehicle) => {
          return (
            <CarMarker
              lat={vehicle.lat}
              lng={vehicle.lng}
              onClick={setChosenVehicle}
              vehicle={vehicle}
              chosen={vehicle.vehicle_id === chosenVehicle.vehicle_id}
            />
          )
        })} */}
      </GoogleMapReact>
    </div>
  );

}

export default Map;