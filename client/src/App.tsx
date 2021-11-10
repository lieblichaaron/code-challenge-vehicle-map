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
  const [filterText, setFilterText] = useState<string>('')
  const [carClass, setCarClass] = useState<string>('')

  const filterVehicles = (status: 'all' | 'online' | 'in-ride') => {
    let tempList: Vehicle[] = [];
    if (status === 'all') {
      tempList = vehiclesList.filter((vehicle: Vehicle) => {
        return true
      });
    } else {
      tempList = vehiclesList.filter((vehicle: Vehicle) => {
        return vehicle.state === status
      });
    }
    setDisplayList(tempList)
  }

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
      return vehicle.vehicle_id.includes(filterText) && (vehicle.class_name === carClass || carClass === 'All')
    });
    setDisplayList(tempList)
  }, [filterText, vehiclesList, carClass])

  return (
    <div className='app-container'>
      <div className='map-container'>
        {chosenVehicle && <Map setChosenVehicle={setChosenVehicle} chosenVehicle={chosenVehicle} />}
      </div>
      <div className='vehicle-list-container'>
        <div style={{ width: '50%' }}>
          <ul className='list-filter'>
            <button onClick={() => filterVehicles('all')}>All</button>
            <button onClick={() => filterVehicles('online')}>Online</button>
            <button onClick={() => filterVehicles('in-ride')}>In ride</button>
            <select name="class" id="class" style={{ marginRight: 5 }} onChange={(e) => setCarClass(e.target.value)}>
              <option value="All">Class</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
            <input type="text" placeholder="Search for vehicle ID" value={filterText} onChange={(event) => setFilterText(event.target.value)} />
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
