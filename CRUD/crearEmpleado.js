const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//https://mbsi69vq93.execute-api.us-east-2.amazonaws.com/test

exports.create = function (event, context, callback) {
    //var entrada = JSON.parse(event.body)
    var entrada = event;
    console.log('Datos entrada', event);
    
    //parametro para agregar fecha
    //const fechaCreacion = new Date().getTime()

    if(typeof entrada.nombre !== 'string' || typeof entrada.apellidos !== 'string' || typeof entrada.direccion !== 'string'){
        console.log('Error de datos-->');
        callback(null, {
            statusCode:400,
            handers: { 'Content-Type': 'application/json' },
            body: "Ocurrion un error"
        })
    }
    console.log('Datos entrada', 
               'Nombre ', entrada.nombre,
               'Apellidos ', entrada.apellidos,
               'Direccion ', entrada.direccion);
    
    //Parametros 
    const params = {
        TableName: 'USUARIOS',
        Item: {
            //id es auto incrementable
            "id": uuid.v1(),
            "nombre":entrada.nombre,
            "apellidos":entrada.apellidos,
            "direccion":entrada.direccion
            
            //"fecha":fechaCreacion
        }
    }


    //Metodo put
    dynamoDb.put(params, (error, data) => {
        if (error) {
            callback(null, {
                statusCode: error.statusCode || 501,
                handers: { 'Content-Type': 'application/json' },
                body: "Ocurrion un error"
            })
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        }
        callback(null,'successful', response)
    });
    
    
    //Ejmplo de JSO---->>>>>>
    /*{
     "nombre":"PETRA",
     "apellidos":"BLANCO",
     "direccion":"calle 5"
     }*/
     
}
