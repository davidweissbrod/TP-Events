import config from "../configs/db_config.js";
import pkg from 'pg';
const { Client } = pkg;

export default class ProvinceRepository {

    // Método para obtener todas las provincias
    getAllAsync = async () => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 'SELECT * FROM provinces';
            const result = await client.query(sql);
            return result.rows; // Retorna las filas obtenidas
        } catch (error) {
            console.error('Error al obtener provincias:', error);
            throw new Error('Error al obtener provincias');
        } finally {
            await client.end(); // Asegura el cierre de la conexión
        }
    }

    // Método para obtener una provincia por ID
    getProvinceById = async (id) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 'SELECT * FROM provinces WHERE id = $1';
            const values = [id];
            const result = await client.query(sql, values);
            if (result.rows.length === 0) {
                throw new Error('Provincia no encontrada');
            }
            return result.rows[0]; // Devuelve solo la primera provincia si la encuentra
        } catch (error) {
            console.error('Error al obtener provincia:', error);
            throw error; // Propaga el error
        } finally {
            await client.end();
        }
    }

    // Método para insertar una nueva provincia
    insertProvince = async (province) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 'INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)';
            const values = [province.name, province.full_name, province.latitude, province.longitude, province.display_order];
            const result = await client.query(sql, values);
            if (result.rowCount === 0) {
                throw new Error('Error al insertar provincia');
            }
            return true;
        } catch (error) {
            console.error('Error al insertar provincia:', error);
            return false; // Devuelve falso si hubo error
        } finally {
            await client.end();
        }
    }

    // Método para actualizar una provincia por ID
    updateById = async (province) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 'UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE id = $6';
            const values = [province.name, province.full_name, province.latitude, province.longitude, province.display_order, province.id];
            const result = await client.query(sql, values);
            if (result.rowCount === 0) {
                throw new Error('Provincia no encontrada para actualizar');
            }
            return true;
        } catch (error) {
            console.error('Error al actualizar provincia:', error);
            return false;
        } finally {
            await client.end();
        }
    }

    // Método para eliminar una provincia por ID
    deleteProvinceById = async (id) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 'DELETE FROM provinces WHERE id = $1';
            const values = [id];
            const result = await client.query(sql, values);
            if (result.rowCount === 0) {
                throw new Error('Provincia no encontrada para eliminar');
            }
            return true;
        } catch (error) {
            console.error('Error al eliminar provincia:', error);
            return false; // Devuelve falso si no pudo eliminarse
        } finally {
            await client.end();
        }
    }
}
