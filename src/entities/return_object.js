export default class ReturnObject{
    status;
    message;
    code;
    JSONcontent;
        
    ReturnObject(){
        this.status = null;
        this.message = null;
        this.code = null;
        this.JSONcontent = null;
    }
    
    static ErrorObject(mensaje){
        const obj = new ReturnObject();
        obj.status = false;
        obj.message = mensaje;
        obj.code = 400;
        obj.JSONcontent = null;
        return obj;
    }
}
