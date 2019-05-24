'use strict'
const AWS = require('aws-sdk');
const dynamoDb= new AWS.DynamoDB.DocumentClient();

//https://njb1pnhp56.execute-api.us-east-2.amazonaws.com/test

module.exports.delete = function (event, context, callback) {

      const idDelete= event.id

      const params= {
            TableName:process.env.DATOS_USUARIO_TABLE,
            Key:{
              id:idDelete
            }
      }
  
   dynamoDb.delete(params,(error,resul)=>{
      if(error){
       callback(null,{
                  statusCode:error.statusCode || 501,
                  headers:{'Content-Type': 'application/json'},
                   body:'Ocurrio un error'
       })
       return
      }
      callback(null,'ok', resul);
   })

//    EJEMPLO
//    {
// 	"id": "5e246070-7e70-11e9-a256-a77cb3626d7a"  
//    }
}