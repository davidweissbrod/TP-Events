import LocationRepository from '../repositories/location_repository.js'

export default class LocationService {
    getAllAsync = async () => {
        const repo = new LocationRepository();
        return await repo.getAllAsync();
    }

    getLocationById = async (id) => {
        const repo = new LocationRepository();
        return await repo.getLocationById(id);
    }

    getEventLocationById = async (id) => {
        const repo = new LocationRepository();
        return await repo.getEventLocationById(id);
    }
}