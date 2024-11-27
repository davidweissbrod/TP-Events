import LocationRepository from '../repositories/location_repository.js';

export default class LocationService {

    // Método para obtener ubicaciones
    getLocations = async (page) => {
        const repo = new LocationRepository();
        let obj = {
            status: false,
            message: "",
            data: []  // Para incluir la información de las ubicaciones
        };
        try {
            const res = await repo.getLocations(page);
            if (res.rowCount > 0) {
                obj.status = true;
                obj.message = "Se obtuvieron con éxito las ubicaciones.";
                obj.data = res.rows; // Almacenar los resultados en el objeto
            } else {
                obj.message = "No se encontraron ubicaciones.";
            }
        } catch (error) {
            obj.message = "Hubo un error al obtener las ubicaciones.";
        }
        return obj;
    }

    // Método para obtener ubicación por ID
    getLocationById = async (id) => {
        const repo = new LocationRepository();
        let obj = {
            status: false,
            message: "",
            data: {} // Para incluir la ubicación específica
        };
        try {
            const res = await repo.getLocationById(id);
            if (res.rowCount > 0) {
                obj.status = true;
                obj.message = "Ubicación obtenida con éxito.";
                obj.data = res.rows[0]; // Almacenar el primer resultado (debería ser solo uno)
            } else {
                obj.message = "No se encontró la ubicación con ese ID.";
            }
        } catch (error) {
            obj.message = "Hubo un error al obtener la ubicación.";
        }
        return obj;
    }

    // Método para obtener eventos asociados a una ubicación
    getEventLocationByLocationId = async (id_location, id_creator_user) => {
        const repo = new LocationRepository();
        let obj = {
            status: false,
            message: "",
            data: []  // Para incluir los eventos asociados
        };
        try {
            const res = await repo.getEventLocationByLocationId(id_location, id_creator_user);
            if (res.rowCount > 0) {
                obj.status = true;
                obj.message = "Eventos obtenidos con éxito.";
                obj.data = res.rows; // Almacenar los eventos asociados
            } else {
                obj.message = "No se encontraron eventos para esa ubicación.";
            }
        } catch (error) {
            obj.message = "Hubo un error al obtener los eventos.";
        }
        return obj;
    }
}
