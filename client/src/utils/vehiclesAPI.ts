export const getAllVehicles = async () => {
    try {
        const res = await fetch('http://localhost:5000/vehicles')
        const vehicles = await res.json()
        return vehicles
    } catch (e) {
        console.log(e)
    }
}

export const getVehiclesInPolygon = async (polygon: number[][]) => {
    try {
        const response = await fetch('http://localhost:5000/vehicles/selectedArea', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(polygon) // body data type must match "Content-Type" header
        });
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}