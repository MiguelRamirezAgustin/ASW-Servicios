'use strict'

//https://njb1pnhp56.execute-api.us-east-2.amazonaws.com/test

const uuid= require ('uuid');
const AWS = require('aws-sdk');
const dynamoDb= new AWS.DynamoDB.DocumentClient();

module.exports.create = function (event, context, callback) {
  
   const fechaRegistro= new Date().getTime()
   const entrada = event;
   console.log('Entrada de datos ', entrada);

   if(typeof entrada.nombre !== 'string' || typeof entrada.apellidos !== 'string' || typeof entrada.edad !== 'string'){
      console.log('Error de datos-->');
      callback(null, {
          statusCode:400,
          headers: { 'Content-Type': 'application/json' },
          body: "error"
      })
  }


   const params={
      TableName: process.env.DATOS_USUARIO_TABLE,
         Item:{
          "id":uuid.v1(),
          "nombre": entrada.nombre,
          "apellidos": entrada.apellidos,
          "edad": entrada.edad,
          "registro": fechaRegistro
         }
   }
   //datos de envio
   console.log('envio---Z' , params)

   dynamoDb.put(params,(error, result)=>{
      if (error) {
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'application/json' },
                body:'Error'
            })
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        }
        callback(null,'successful', response)
    });

    //EJEMPLO
    // {
    //     "nombre": "MIGUEL",
    //     "apellidos": "RAMIREZ",
    //      "edad": "12"
    //  }

}