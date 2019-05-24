const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.getEmpleados = function (event, context, callback) {
  
    const params = {
        TableName: 'USUARIOS',
    }
    
     dynamoDb.scan(params, (error, result) => {
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't fetch the todos."
      })
      return
    }
    callback(null, result.Items)
 })

    
}

    
