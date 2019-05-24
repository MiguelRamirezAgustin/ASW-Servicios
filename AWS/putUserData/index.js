'use strict'
const AWS = require('aws-sdk');
AWS.config.update({regios:"us-east-2"})

exports.handler = function (event, context, callback) {
    const documentClient= new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    params={
      Item:{
        id:"12",
        firstname:"Juan",
        lasname:"juan"
      },
      TableName:"User"
    }

    try{
     const data=  documentClient.putItem(params).promise();
     console.log('Exiro--> ', JSON.stringify(data));
    }catch(er){
     console.log('Error--> ', JSON.stringify(er));
    }
}

exports.handler = function index(event, context, callback) {
  var AWS = require("aws-sdk");
  AWS.config.update({
      region: "us-east-2"
  }); 
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
  var entrada = JSON.parse(JSON.stringify(event, 30000));
  
  //var nameTable = entrada.nameTable;
  var datos = [];
  var contadorErrores = 0;
  
  //
  var listScan = [];
  var ListScanFiltrados = [];
  //
  
  var params = {
      TableName: `${entrada.nameTable}`,
      Limit: 5
  };
  scanGeneral(params)
  
  function scanGeneral (params){
      console.log('1_______________',params);
      dynamodb.scan(params, function(err, data) {
          //console.log('2____________', params);
          if (err){
              console.log(err, err.stack);
          }else{
              console.log("items escaneados", data.Items.length);
              if(data.Items.length == 0 || !data.Items){
                  console.log("entró a la respuesta de retorno");
                  context.done(null,{message:'Elementos eliminados correctamente'});
                  return "Elementos eliminados correctamente";
              }
              //console.log(JSON.stringify(data.Items));
              console.log('11____________', params);
              
              listScan = listScan.concat(JSON.stringify(data.Items))
              console.log('Prueba Uno CONCAT________________', listScan)
              
              /********************Filter de Arreglo******************/
              //ListScanFiltrados = listScan[i].filter(filtrarListScan);
              
              /*function filtrarListScan(elemento) {
                  return elemento >= 10;
              }*/
              console.log('Arreglo de Elementos Filtardos',ListScanFiltrados)
              
              eliminaDatos(JSON.stringify(data.Items)).then(respuesta =>{
                  console.log('5____', respuesta)
                  if(respuesta.ok == false){
                      context.done(null,{message:'no se pudieron eliminar los elementos', error:respuesta.error})
                      return "no se pudieron eliminar los elementos";
                  }else if(respuesta.ok == true){
                      scanGeneral(params);
                  }
              });
          }
      });
  }
  
  function eliminaDatos(datos){
      return new Promise((resolve, reject)=>{
          console.log('12____________', params);
          datos = JSON.parse(datos);
          var listaPromesas = [];
          //console.log('___________Prueba para Switch___________', `${entrada.nameTable}`);
          console.log("datos a eliminar", datos.length);
          
          switch(`${entrada.nameTable}`){
              case 'MessageTable':
                  // code
                  console.log('IF ELIMINATION EN CADEN__________',datos)
                  console.log('_________Si entro al case 1_______');
                  //console.log('___________Entro al Switch___________');
                  for(var i = 0; i < datos.length; i++){
                      var p = new Promise((resolve,reject)=>{
                          var params = {
                          TableName: `${entrada.nameTable}`,
                          Key: { 
                               "createdAt": {S: datos[i].createdAt.S},    
                               "conversationId": { S: datos[i].conversationId.S }
                          }
                      };
                      dynamodb.deleteItem(params, function(err, data) {
                          //console.log("params a eliminar", params);
                          if (err){
                              console.log('3_____',err, err.stack);
                             // console.log("contador", contadorErrores);
                          //    if(contadorErrores >= 10){
                            //      console.log("entró al resolve de error");
                              //    context.done(null,{message:'no se pudieron eliminar los elementos', err})
                                //  return "no se pudieron eliminar los elementos";
                              //}
                              //contadorErrores = contadorErrores + 1;
                              reject({ok:false});
                              //return resolve({ok:true});
                          }else{
                              //console.log('4_________')
                              //console.log('holaaaaaaaaaaaaaaaaaa',data);
                              resolve({ok:true});
                             
                          }
                      })  
                      
                      if(i == datos.length){
                          //resolve({ok:true});
                      }
                      });
                  listaPromesas.push(p);
                  }
                  
                  break;
              
              case 'PendingNotificationsTable':
                  // code
                  console.log('___________Entro al case 2___________');
                  for(var i = 0; i < datos.length; i++){
                      var p = new Promise((resolve,reject)=>{
                          var params = {
                          TableName: `${entrada.nameTable}`,
                          Key: { 
                               "userId": { S: datos[i].userId.S },    
                               "conversationId": { S: datos[i].conversationId.S }
                          }
                      };
                      dynamodb.deleteItem(params, function(err, data) {
                          //console.log("params a eliminar", params);
                          if (err){
                              console.log('3_____',err, err.stack);
                             // console.log("contador", contadorErrores);
                          //    if(contadorErrores >= 10){
                            //      console.log("entró al resolve de error");
                              //    context.done(null,{message:'no se pudieron eliminar los elementos', err})
                                //  return "no se pudieron eliminar los elementos";
                              //}
                              //contadorErrores = contadorErrores + 1;
                              reject({ok:false});
                              //return resolve({ok:true});
                          }else{
                              //console.log('4_________')
                              //console.log('holaaaaaaaaaaaaaaaaaa',data);
                              resolve({ok:true});
                             
                          }
                      })  
                      
                      if(i == datos.length){
                          //resolve({ok:true});
                      }
                      });
                  listaPromesas.push(p);
                  }
                  
                  break;
              
              case 'UserConversationsTable':
                  // code
                  console.log('___________Entro al case 3___________');
                  for(var i = 0; i < datos.length; i++){
                      var p = new Promise((resolve,reject)=>{
                          var params = {
                          TableName: `${entrada.nameTable}`,
                          Key: { 
                               "userId": { S: datos[i].userId.S },    
                               "conversationId": { S: datos[i].conversationId.S }
                          }
                      };
                      dynamodb.deleteItem(params, function(err, data) {
                          //console.log("params a eliminar", params);
                          if (err){
                              console.log('3_____',err, err.stack);
                             // console.log("contador", contadorErrores);
                          //    if(contadorErrores >= 10){
                            //      console.log("entró al resolve de error");
                              //    context.done(null,{message:'no se pudieron eliminar los elementos', err})
                                //  return "no se pudieron eliminar los elementos";
                              //}
                              //contadorErrores = contadorErrores + 1;
                              reject({ok:false});
                              //return resolve({ok:true});
                          }else{
                              //console.log('4_________')
                              //console.log('holaaaaaaaaaaaaaaaaaa',data);
                              resolve({ok:true});
                             
                          }
                      })  
                      
                      if(i == datos.length){
                          //resolve({ok:true});
                      }
                      });
                  listaPromesas.push(p);
                  }
                  
                  break;
              case 'ConversationTable':
                  // code
                  console.log('___________Entro al case 4___________');
                  for(var i = 0; i < datos.length; i++){
                      var p = new Promise((resolve,reject)=>{
                          var params = {
                          TableName: `${entrada.nameTable}`,
                          Key: { 
                               "id": { S: datos[i].id.S },    
                          }
                      };
                      dynamodb.deleteItem(params, function(err, data) {
                          //console.log("params a eliminar", params);
                          if (err){
                              console.log('3_____',err, err.stack);
                             // console.log("contador", contadorErrores);
                          //    if(contadorErrores >= 10){
                            //      console.log("entró al resolve de error");
                              //    context.done(null,{message:'no se pudieron eliminar los elementos', err})
                                //  return "no se pudieron eliminar los elementos";
                              //}
                              //contadorErrores = contadorErrores + 1;
                              reject({ok:false});
                              //return resolve({ok:true});
                          }else{
                              //console.log('4_________')
                              //console.log('holaaaaaaaaaaaaaaaaaa',data);
                              resolve({ok:true});
                             
                          }
                      })  
                      
                      if(i == datos.length){
                          //resolve({ok:true});
                      }
                      });
                  listaPromesas.push(p);
                  }
                  
                  break;    
              default:
                  console.log('Lo lamentamos, por el momento no disponemos de ' + `${entrada.nameTable}` + '.');
          }
          
          console.log('___________Salio del Switch___________');
          
          Promise.all(listaPromesas).then(datos=>{
             resolve({ok:true})
          }),
          err =>{callback({ok:false, msg:'Error aprovicionamiento', error:err})};
          //resolve({ok:true})
      })
      
  }
  
  
 
};
