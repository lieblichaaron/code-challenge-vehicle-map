import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Vehicle } from '../utils/vehicle';
import CarMarker from '../components/CarMarker'
import { getVehiclesInPolygon } from '../utils/vehiclesAPI'

const Map = ({ setChosenVehicle, chosenVehicle }: { setChosenVehicle: Function; chosenVehicle: Vehicle }) => {
  const [searchArea, setSearchArea] = useState<any>()
  const [mapState, setMapState] = useState<any>()
  const [mapsState, setMapsState] = useState<any>()
  const [vehiclesInArea, setVehiclesInArea] = useState<Vehicle[]>()

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
  const getLocation = async () => {
    const polygon: number[][] = []
    searchArea.getPath().td.forEach((coords: any, i: number) => {
      const point = []
      point.push(coords.lat())
      point.push(coords.lng())
      polygon[i] = point
    })
    const res = await getVehiclesInPolygon(polygon)
    setVehiclesInArea(res)
    setChosenVehicle(res[0])
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
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
        onClick={searchArea ? getLocation : startSearchArea}
        style={{ position: 'absolute', bottom: 40, left: 0, width: '200px', borderRadius: 10, backgroundColor: '#3B5D7F', color: 'white' }} >
        {!searchArea ? 'Start searching an area' : 'Search area'}
      </button>
      {searchArea && <button
        onClick={closeSearchArea}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', borderRadius: 10, backgroundColor: '#3B5D7F', color: 'white' }} >
        {'Close search area'}
      </button>}
    </div>
  );

}

export default Map;