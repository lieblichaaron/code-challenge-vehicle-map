import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Vehicle } from '../utils/vehicle';
import CarMarker from '../components/CarMarker'
import { getVehiclesInPolygon } from '../utils/vehiclesAPI'
import './Map.css'
import Loader from "react-loader-spinner";

interface I_MapProps {
  setChosenVehicle: Function;
  chosenVehicle: Vehicle;
  setFilters: Function,
  setAreaList: Function
}

const Map = ({ setChosenVehicle, chosenVehicle, setFilters, setAreaList }: I_MapProps) => {
  const [searchArea, setSearchArea] = useState<any>()
  const [mapState, setMapState] = useState<any>()
  const [mapsState, setMapsState] = useState<any>()
  const [vehiclesInArea, setVehiclesInArea] = useState<Vehicle[]>()
  const [isLoading, setIsLoading] = useState(false)

  const defaultBounds = [
    { lat: chosenVehicle.lat + .01, lng: chosenVehicle.lng - .01 },
    { lat: chosenVehicle.lat + .01, lng: chosenVehicle.lng + .01 },
    { lat: chosenVehicle.lat - .01, lng: chosenVehicle.lng + .01 },
    { lat: chosenVehicle.lat - .01, lng: chosenVehicle.lng - .01 },
  ]

  const closeSearchArea = () => {
    searchArea.setMap(null)
    setSearchArea(undefined)
    setVehiclesInArea(undefined)
    setAreaList()
    setFilters({ text: '', status: 'all', class: 'all' })
  }

  const startSearchArea = () => {
    if (mapsState) {
      const area = new mapsState.Polygon({
        map: mapState,
        paths: defaultBounds,
        strokeColor: "green",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "green",
        fillOpacity: 0.35,
        draggable: true,
        geodesic: true,
        editable: true,
      })
      setSearchArea(area)
    }
  }
  const getVehiclesInArea = async () => {
    setIsLoading(true)
    const polygon: number[][] = []
    searchArea.getPath().td.forEach((coords: any, i: number) => {
      const point = []
      point.push(coords.lat())
      point.push(coords.lng())
      polygon[i] = point
    })
    const res = await getVehiclesInPolygon(polygon)
    if (res.length > 0) {
      setVehiclesInArea(res)
      setChosenVehicle(res[0])
      setAreaList(res)
      setFilters({ text: '', status: 'all', class: 'all' })
    }
    setIsLoading(false)
  }

  return (
    <div className='container'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY || '' }}
        center={{
          lat: chosenVehicle.lat,
          lng: chosenVehicle.lng
        }}
        defaultZoom={13}
        hoverDistance={25}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={
          ({ map, maps }) => {
            setMapState(map)
            setMapsState(maps)
          }
        }
      >
        {isLoading && <div style={{ zIndex: 999, position: 'absolute', top: -20, left: -20 }}>
          <Loader
            type="Puff"
            color="black"
            height={50}
            width={50}
          />
        </div>}
        <CarMarker
          lat={chosenVehicle.lat}
          lng={chosenVehicle.lng}
          onClick={setChosenVehicle}
          vehicle={chosenVehicle}
          chosen={true}
        />
        {vehiclesInArea && vehiclesInArea.map((vehicle: Vehicle) => {
          return (
            <CarMarker
              key={vehicle.vehicle_id}
              lat={vehicle.lat}
              lng={vehicle.lng}
              onClick={setChosenVehicle}
              vehicle={vehicle}
              chosen={vehicle.vehicle_id === chosenVehicle.vehicle_id}
            />
          )
        })}
      </GoogleMapReact>
      <button
        onClick={searchArea ? getVehiclesInArea : startSearchArea}
        className='button'
        style={{ bottom: 40 }} >
        {!searchArea ? 'Start searching an area' : 'Search area'}
      </button>
      {searchArea && <button
        onClick={closeSearchArea}
        className='button'
        style={{ bottom: 0 }} >
        {'Close search area'}
      </button>}
    </div>
  );

}

export default Map;