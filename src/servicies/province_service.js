import ProvinceRepository from '../repositories/province_repository.js'

export default class ProvinceService{

    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        return await repo.getAllAsync();
    }
    getProvinceById = async (id) =>{
        const repo = new ProvinceRepository()
        return await repo.getProvinceById(id)
    }
    insertProvince = async (province) =>{
        const repo = new ProvinceRepository()
        return await repo.insertProvince(province)
    }
    updateById = async (province) => {
        const repo = new ProvinceRepository()
        return await repo.updateById(province)
    }
    deleteProvinceById = async (id) =>{
        const repo = new ProvinceRepository()
        return await repo.deleteProvinceById(id)
    }

}