import LocationRepository from '../repositories/location-repository.js'

export default class LocationService {
    getAllAsync = async () => {
        const repo = new LocationRepository();
        return await repo.getAllAsync();
    }

    getLocationById = async () => {
        const repo = new LocationRepository();
        return await repo.getLocationById(id);
    }

    getEventLocationById = async () => {
        const repo = new LocationRepository();
        return await repo.getEventLocationById(id);
    }
}