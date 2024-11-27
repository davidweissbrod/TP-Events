import ProvinceRepository from '../repositories/province_repository.js'

export default class ProvinceService{

    getAllAsync = async () => {
        try {
            return await this.repo.getAllAsync();
        } catch (error) {
            console.error('Error al obtener provincias:', error);
            throw new Error('No se pudieron obtener las provincias');
        }
    }

    // Método para obtener una provincia por ID
    getProvinceById = async (id) => {
        try {
            const province = await this.repo.getProvinceById(id);
            if (!province) {
                throw new Error('Provincia no encontrada');
            }
            return province;
        } catch (error) {
            console.error(`Error al obtener la provincia con ID ${id}:`, error);
            throw new Error('No se pudo obtener la provincia');
        }
    }

    // Método para insertar una nueva provincia
    insertProvince = async (province) => {
        try {
            const success = await this.repo.insertProvince(province);
            if (!success) {
                throw new Error('No se pudo insertar la provincia');
            }
            return { success: true, message: 'Provincia creada exitosamente' };
        } catch (error) {
            console.error('Error al insertar la provincia:', error);
            return { success: false, message: 'Error al crear la provincia' };
        }
    }

    // Método para actualizar una provincia por ID
    updateById = async (province) => {
        try {
            const success = await this.repo.updateById(province);
            if (!success) {
                throw new Error('Provincia no encontrada o no se pudo actualizar');
            }
            return { success: true, message: 'Provincia actualizada exitosamente' };
        } catch (error) {
            console.error('Error al actualizar la provincia:', error);
            return { success: false, message: 'Error al actualizar la provincia' };
        }
    }

    // Método para eliminar una provincia por ID
    deleteProvinceById = async (id) => {
        try {
            const success = await this.repo.deleteProvinceById(id);
            if (!success) {
                throw new Error('Provincia no encontrada o no se pudo eliminar');
            }
            return { success: true, message: 'Provincia eliminada exitosamente' };
        } catch (error) {
            console.error(`Error al eliminar la provincia con ID ${id}:`, error);
            return { success: false, message: 'Error al eliminar la provincia' };
        }
    }

}