import jwt from 'jsonwebtoken'
import user from './src/entities/users.js'

const payload = {
    username: user.username,
    password: user.password
}

const key = 'Secreto123#'

const options = {
    expiresIn: '7d',
    issuer: 'Events'
}

const token = jwt.sign(payload, key, options)
console.log(token)

export default token;