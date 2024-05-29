import jwt from 'jsonwebtoken'
import tokenEncript from './token'

const secretKey = "Secreto123#"
const token = tokenEncript;
let payloadOriginal = null

try{
    payloadOriginal = await jwt.verify(token, secretKey)
} catch(e){
    console.log(e)
}