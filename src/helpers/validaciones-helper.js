
export default class ValidacionesHelper{

    getValidateString(str){
        let valido = true
        if(str.length < 3 || str === ""){
            return false
        } 
        return valido
    }
    
    emailValidation(correo){
        if (correo.indexOf("@") === -1 || correo.indexOf(".") === -1) {
            return false;
        }
        if (correo.indexOf("@") === 0 || correo.indexOf("@") === correo.length - 1 || correo.indexOf(".") === 0 || correo.indexOf(".") === correo.length - 1) {
            return false;
        }
        return true;
    }
}



