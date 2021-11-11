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
          <ul className='list-filter'>
            <button onClick={() => setFilters({ ...filters, status: 'all' })} style={{ backgroundColor: filters.status === 'all' ? 'grey' : undefined }}>All</button>
            <button onClick={() => setFilters({ ...filters, status: 'online' })} style={{ backgroundColor: filters.status === 'online' ? 'grey' : undefined }}>Online</button>
            <button onClick={() => setFilters({ ...filters, status: 'in-ride' })} style={{ backgroundColor: filters.status === 'in-ride' ? 'grey' : undefined }}>In ride</button>
            <select value={filters.class} name="class" id="class" style={{ marginRight: 5 }} onChange={(e) => setFilters({ ...filters, class: e.target.value })}>
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
      </div>
      <div className='vehicle-card'>
        {chosenVehicle && <VehicleCard vehicle={chosenVehicle} />}
      </div >
    </div >
  );
}

export default App;
