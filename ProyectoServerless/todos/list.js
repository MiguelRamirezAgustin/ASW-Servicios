'use strict'
const AWS= require('aws-sdk');
const dynamoDb= new AWS.DynamoDB.DocumentClient();

//https://njb1pnhp56.execute-api.us-east-2.amazonaws.com/test

module.exports.list = function (event, context, callback) {
    
  const params={
      TableName:process.env.DATOS_USUARIO_TABLE
   }


   dynamoDb.scan(params,(error,result)=>{
      if(error){
       callback(null,{
          statusCode:error.statusCode || 501,
          body:'error'
       })
       return
      }
      callback(null,result.Items)
   })
}