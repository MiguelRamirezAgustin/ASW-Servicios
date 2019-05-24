const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.actualizarEmpleado = function (event, context, callback) {
     const data = event;
     console.log('Evento: ', data);
     
      //validacion de dos campos
    //if(typeof data.nombre !== 'string' || typeof data.apellidos !=='string') {
     
    //Validacion de parametros
    if(typeof data.nombre !== 'string' || typeof data.apellidos !=='string' || typeof data.direccion !== 'string') {
        console.log('Error de datos invalidos');
        callback(null, {
            statusCode:400,
            headers:{'Content-Type': 'application/json'},
            body:'Ocurrio un error al actualizar'
        })
        return;
    }
   
      
      //Parametros 
     const idusuario= event.id
     const datonombre= event.nombre
     const datoapellidos= event.apellidos
     const datodireccion= event.direccion
     
     console.log('Log pra visualizar datos: ',  'id ', idusuario,  'Nombre', datonombre, 'apellidos ', datoapellidos, 'direccion ', datodireccion)
 
   const paramss = {
    TableName:'USUARIOS',
    Key: {
        //Id es autoincrementable
      id: event.id
    },
    ExpressionAttributeNames: {
        //Atributos para la tabla
      '#Nombre': 'nombre',
      '#Apellidos': 'apellidos',
      '#Direccion': 'direccion'
    },
    ExpressionAttributeValues: {
        //atributos para la tabla
      ':nombre': data.nombre,
      ':apellidos': data.apellidos,
      ':direccion': data.direccion
    },                
    UpdateExpression: 'SET #Nombre= :nombre,  #Apellidos= :apellidos,  #Direccion= :direccion',
    ReturnValues: 'ALL_NEW'
  }


   console.log('Log para envios de datos: ', paramss)
 
   dynamoDb.update(paramss,(error, result)=>{
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

  // EJEMPLO JSON
//    {
//     "nombre": "Sandra",
//    "apellidos": "flores",
//    "id": "276e8ca0-7dc0-11e9-8afc-4dca0560e8ee",
//    "direccion": "calle 4 sur"
//    }
   
};
