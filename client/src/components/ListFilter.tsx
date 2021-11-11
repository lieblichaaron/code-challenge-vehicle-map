import React from "react";
import './ListFilter.css'

const ListFilter = ({ setFilters, filters }: { setFilters: Function; filters: { text: string; status: string; class: string; } }) => {
    return (
        <ul className='list-filter'>
            <div className='list-filter-half'>
                <button onClick={() => setFilters({ ...filters, status: 'all' })} style={{ backgroundColor: filters.status === 'all' ? 'grey' : undefined }}>All</button>
                <button onClick={() => setFilters({ ...filters, status: 'online' })} style={{ backgroundColor: filters.status === 'online' ? 'grey' : undefined }}>Online</button>
                <button onClick={() => setFilters({ ...filters, status: 'in-ride' })} style={{ backgroundColor: filters.status === 'in-ride' ? 'grey' : undefined }}>In ride</button>
            </div>
            <div className='list-filter-half inputs'>
                <select value={filters.class} name="class" id="class" style={{ margin: '5px' }} onChange={(e) => setFilters({ ...filters, class: e.target.value })}>
                    <option value="all">Class</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
                <input style={{ margin: '5px' }} type="text" placeholder="Vehicle ID" value={filters.text} onChange={(event) => setFilters({ ...filters, text: event.target.value })} />
            </div>
        </ul >
    )
}

export default ListFilter;