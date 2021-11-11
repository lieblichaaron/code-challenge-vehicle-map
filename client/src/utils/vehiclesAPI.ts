const baseUrl = 'https://autofleetlieblich.herokuapp.com/'
export const getAllVehicles = async () => {
    try {
        const res = await fetch(baseUrl + 'vehicles')
        const vehicles = await res.json()
        return vehicles
    } catch (e) {
        console.log(e)
    }
}

export const getVehiclesInPolygon = async (polygon: number[][]) => {
    try {
        const response = await fetch(baseUrl + 'vehicles/selectedArea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(polygon)
        });
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}