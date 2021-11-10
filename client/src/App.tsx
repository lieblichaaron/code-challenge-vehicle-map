import React, { useEffect, useState } from 'react';
import './App.css'
import { Vehicle } from './utils/vehicle';
import { getAllVehicles } from './utils/vehiclesAPI'
import VehiclesList from './views/VehiclesList';
import VehicleCard from './views/VehicleCard';
import Map from './views/Map'

function App() {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([])
  const [displayList, setDisplayList] = useState<Vehicle[]>([])
  const [chosenVehicle, setChosenVehicle] = useState<Vehicle>()
  const [filters, setFilters] = useState({ text: '', status: 'all', class: 'all' })

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
    const tempList: Vehicle[] = vehiclesList.filter((vehicle: Vehicle) => {
      return (
        vehicle.vehicle_id.includes(filters.text) &&
        (vehicle.class_name === filters.class || filters.class === 'all') &&
        (vehicle.state === filters.status || filters.status === 'all')
      )
    });
    setDisplayList(tempList)
  }, [filters, vehiclesList])

  return (
    <div className='app-container'>
      <div className='map-container'>
        {chosenVehicle && <Map setChosenVehicle={setChosenVehicle} chosenVehicle={chosenVehicle} />}
      </div>
      <div className='vehicle-list-container'>
        <div style={{ width: '50%' }}>
          <ul className='list-filter'>
            <button onClick={() => setFilters({ ...filters, status: 'all' })}>All</button>
            <button onClick={() => setFilters({ ...filters, status: 'online' })}>Online</button>
            <button onClick={() => setFilters({ ...filters, status: 'in-ride' })}>In ride</button>
            <select name="class" id="class" style={{ marginRight: 5 }} onChange={(e) => setFilters({ ...filters, class: e.target.value })}>
              <option value="all">Class</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
            <input type="text" placeholder="Search for vehicle ID" value={filters.text} onChange={(event) => setFilters({ ...filters, text: event.target.value })} />
          </ul >
          {chosenVehicle && <VehiclesList vehicles={displayList} setChosenVehicle={setChosenVehicle} chosenVehicle={chosenVehicle} />
          }
        </div >
        {chosenVehicle && <VehicleCard vehicle={chosenVehicle} />}
      </div >
    </div >
  );
}

export default App;
