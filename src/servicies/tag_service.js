import TagsRepository from '../repositories/tags-repository.js'

export default class TagsService{
    getAllAsync = async () =>{
        const repo = new TagsRepository();
        return await repo.getAllAsync();
    }
    getTagById = async (id) =>{
        const repo = new TagsRepository();
        return await repo.getTagById(id);
    }
    getTagByName = async (name) =>{
        const repo = new TagsRepository();
        return await repo.getByName(name);
    }
}