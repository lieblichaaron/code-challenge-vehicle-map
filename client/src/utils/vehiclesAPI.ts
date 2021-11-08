export const getAllVehicles = async () => {
    try{
    const res = await fetch('http://localhost:5000/vehicles')
    const vehicles = await res.json()
    return vehicles
    } catch (e) {
        console.log(e)
    }
}