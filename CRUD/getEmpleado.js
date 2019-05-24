const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//https://mbsi69vq93.execute-api.us-east-2.amazonaws.com/test/getempleado

exports.getEmpleado =  (event, context, callback) => {
    
    /* CODIGO DURO
      const paramsElement ={
            TableName:"USUARIOS",
            Key:{
                  id:"6def99e0-7d9c-11e9-bf09-09b3e0fcac7c"
            }
      } 
      */
       console.log("Evento de entrada--> ", event)
      
        const entradaId= event.id;
     
       if(typeof entradaId =='undefined' || typeof entradaId !=='string'){
          callback(null,{
           statusCode: 400,
           headers: { 'Content-Type': 'application/json' },
           body: "Error"
          })
      }
      
    
     console.log('Evento ', entradaId)
      
      const paramsElement ={
            TableName:"USUARIOS",
            Key:{ id:  entradaId}
      } 
      
     console.log('Evento params envio', paramsElement)
      
      //cachar error  AWS.DynamoDB.DocumentClient
      dynamoDb.get(paramsElement, (er, data)=>{
      if(er){
          callback(null, {
        statusCode: er.statusCode || 501,
        headers: { 'Content-Type': 'application/json' },
        body: "error"
      })
      return
            //console.log('error-- ', JSON.stringify(er));
            //context.done(null, er);
      }
        console.log('Exit---> ', JSON.stringify(data));
       callback(null, data.Item)
       
      })  



};
