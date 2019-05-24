'use strict'
const AWS= require('aws-sdk');
const dynamoDb= new AWS.DynamoDB.DocumentClient();

// https://njb1pnhp56.execute-api.us-east-2.amazonaws.com/test

module.exports.update = function (event, context, callback) {
   const  fecheActualizar= new Date().getTime();

   const entrada= event;
   console.log('Datos de entrada ', event);

   if(typeof entrada.nombre !== 'string' || typeof entrada.apellidos !== 'string' || typeof entrada.edad !== 'string'){
    console.log('Error de datos-->');
    callback(null, {
        statusCode:400,
        headers: { 'Content-Type': 'application/json' },
        body: "error"
    }) 
  }

   //variables para actualizar
   const idUsuario= event.id
   const datoNombre= event.nombre
   const datoapellido= event.apellido
   const datosedad= event.edad

   const params={
         TableName:process.env.DATOS_USUARIO_TABLE,
         Key:{
               id:event.id
         },
         ExpressionAttributeNames: {
            //Atributos para la tabla
          '#Nombre': 'nombre',
          '#Apellidos': 'apellidos',
          '#Edad': 'edad',
          //nuevo campo para la actualizacion
          '#Update':'update'
        },
        ExpressionAttributeValues: {
            //atributos para la tabla
          ':nombre': entrada.nombre,
          ':apellidos': entrada.apellidos,
          ':edad': entrada.edad,
          ':update':fecheActualizar
        },                
        UpdateExpression: 'SET #Nombre= :nombre,  #Apellidos= :apellidos,  #Edad= :edad, #Update= :update ',
        ReturnValues: 'ALL_NEW'
      }

      console.log('Log para envios de datos: ', params)

      dynamoDb.update(params,(error, result)=>{
            if(error){
                callback(null,{
                    statusCode:error.statusCode || 501,
                    headers:{'Content-Type': 'application/json'},
                     body:'Ocurrio un error'
                })
                return;
            }
            callback(null,'successful', result);
        })

   //EJEMPLO
  //  {
  //   "id": "d192da50-7e70-11e9-bfc0-71d0d064252f",
  //   "nombre": "JORGE",
  //   "apellidos": "COLIN",
  //   "edad": "50"
  // }
}