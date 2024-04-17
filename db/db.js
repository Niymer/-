/**
 *
 * @param {*} success
 * @param {*} error
 */

const {DBHOST,DBPORT,DBNAME}=require('../config/config');
module.exports=function (success,error){
  if(typeof error !=='function'){
    error=()=>{
      console.log('MongoDB Connection Error:', err);
    }
  }
  const mongoose = require("mongoose");
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`,);

  mongoose.connection.once("open", success)

  mongoose.connection.on('error', (err) => error);

  mongoose.connection.on('close', () => console.log('MongoDB Disconnected'));

}
