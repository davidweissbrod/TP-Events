import UserRepository from '../repositories/user-repository.js'

export default class UserService{
    insertUser = async () => {
        const repo = UserRepository();
        return await repo.insertUser(user)
    }
    getUserById = async () => {
        const repo = UserRepository();
        return await repo.getUserByUsername()
    }
}