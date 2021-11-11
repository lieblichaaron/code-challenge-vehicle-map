import React, { useEffect, useState } from 'react';
import './App.css'
import { Vehicle } from './utils/vehicle';
import { getAllVehicles } from './utils/vehiclesAPI'
import VehiclesList from './views/VehiclesList';
import VehicleCard from './views/VehicleCard';
import Map from './views/Map'
import ListFilter from './components/ListFilter';

function App() {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([])
  const [displayList, setDisplayList] = useState<Vehicle[]>([])
  const [chosenVehicle, setChosenVehicle] = useState<Vehicle>()
  const [filters, setFilters] = useState({ text: '', status: 'all', class: 'all' })
  const [areaList, setAreaList] = useState<Vehicle[]>()

  const getVehicleList = async () => {
    const vehicles = await getAllVehicles()
    setVehiclesList(vehicles)
    setDisplayList(vehicles)
    setChosenVehicle(vehicles[0])
  }

  useEffect(() => {
    getVehicleList()
  }, [])

  useEffect(() => {
    let tempList: Vehicle[];
    if (areaList) {
      tempList = areaList.filter((vehicle: Vehicle) => {
        return (
          vehicle.vehicle_id.includes(filters.text) &&
          (vehicle.class_name === filters.class || filters.class === 'all') &&
          (vehicle.state === filters.status || filters.status === 'all')
        )
      });
    } else {
      tempList = vehiclesList.filter((vehicle: Vehicle) => {
        return (
          vehicle.vehicle_id.includes(filters.text) &&
          (vehicle.class_name === filters.class || filters.class === 'all') &&
          (vehicle.state === filters.status || filters.status === 'all')
        )
      });
    }
    setDisplayList(tempList)
  }, [filters, vehiclesList, areaList])

  return (
    <div className='app-container'>
      <div className='map-container'>
        {chosenVehicle && <Map setAreaList={setAreaList} setChosenVehicle={setChosenVehicle} chosenVehicle={chosenVehicle} setFilters={setFilters} />}
        <div style={{ width: '30%', maxHeight: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <ListFilter setFilters={setFilters} filters={filters} />
          {chosenVehicle && <VehiclesList vehicles={displayList} setChosenVehicle={setChosenVehicle} chosenVehicle={chosenVehicle} />
          }
        </div >
      </div>
      <div className='vehicle-card'>
        {chosenVehicle && <VehicleCard vehicle={chosenVehicle} />}
      </div >
    </div >
  );
}

export default App;
