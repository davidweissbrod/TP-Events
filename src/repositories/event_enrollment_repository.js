import BD_Helper from "../helpers/sql-helper.js"
const PQ = new BD_Helper();

export default class EventsEnrrollmentRepository{
    getUsersEnrolls = async(sql, values) => {
        let array = await PQ.Query(sql, values);
        if (array){
            return array.rows;      
        }
        else{
            return null;
        } 
    }   
}