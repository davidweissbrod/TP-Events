import UserRepository from '../repositories/user_repository.js'

export default class UserService{
    insertUser = async (user) => {
        const repo = UserRepository();
        return await repo.insertUser(user)
    }
    getUserById = async (id) => {
        const repo = UserRepository();
        return await repo.getUserById(id)
    }
    getUserByUsernamePassword = async (username, password) => {
        const repo = UserRepository();
        return await repo.getUserByUsernamePassword(username, password)
    }
}