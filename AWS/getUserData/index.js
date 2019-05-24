
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

exports.handler = function (event, context, callback) {
     const db  = new AWS.DynamoDB({apiVersion: '2012-10-08'});
     const  documentClient= new AWS.DynamoDB.DocumentClient({region: "us-east-2"})
     
      const params = {
            TableName: "user",
            Key:{
              id:{
                  S:"12"
                 }
             }
        }

      const paramsElement ={
            TableName:"user",
            Key:{
                  id:"12"
            }
      } 

      //cachar error AWS.DynamoDB 
      db.getItem(params,(erro, data)=>{
      if(erro){
            console.log('Erros es--> ', erro);
      }
      console.log('No fue erro >>> ', data)
      })

      //cachar error  AWS.DynamoDB.DocumentClient
      documentClient.get(paramsElement, (er, data)=>{
      if(er){
            console.log('error-- ', JSON.stringify(er));
      }
      console.log('Exit---> ', JSON.stringify(data));
      })  
      
      //cachar error  AWS.DynamoDB.DocumentClient
      /*try{
       const data = await documentClient.get(paramsElement).promise();
       console.log('Exitoso--->> ', JSON.stringify(data));
      }
      catch (erro){
        console.log('Error--> ', JSON.stringify(erro));
      }*/

      //cachar error  AWS.DynamoDB.DocumentClient
      /*try{
       const response= await db.getItem(params).promise();
        console.log('Exito--> ', JSON.stringify(response));
      }catch(er){
            console.log('Error--> ', JSON.stringify(er));
      }*/
}