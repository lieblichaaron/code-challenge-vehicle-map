export interface Vehicle {
        vehicle_id: string,
        state: 'online' | 'in-ride',
        route_commit_id: string,
        seats: string,
        distance: number,
        class_name: string,
        lat: number,
        lng: number,
        bearing: number
}