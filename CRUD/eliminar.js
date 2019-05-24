const AWS=require('aws-sdk');
const dynamoDb= new AWS.DynamoDB.DocumentClient();

exports.deleteEmpleado =  (event, context, callback) => {
  // dato de entrada
  const entradaIdDelete= event.id;
  console.log('Event', entradaIdDelete)
  
   /*codigo duro
   const params ={
       TableName:'USUARIOS',
       Key:{
           id:"cdf2e430-7d94-11e9-a21c-9b18445e34ef"
       }
   }*/
   
   const params={
         TableName:'USUARIOS',
       Key:{
           id:entradaIdDelete
       }
   }
   console.log('paramentos ', params);
   
   dynamoDb.delete(params, (error, response)=>{
       if(error){
           console.log('error', error);
          callback(null,'error ', error)
       }
       console.log('Exito ' , response )
       callback(null,'ok', response)
   })
   
   
};
