var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });

exports.handler = async function (event, context, callback) {
  var request = JSON.parse(event.body);
  var params = {
    Destination: {
        // insert address to be sent to, either dynamic or static
      ToAddresses: ['INSERT EMAIL ADDRESS'],
    },
    Message: {
      Body: {
        //   build email body, simple string example here
        Text: { Data: request.message + " \nName: " + request.name + " \nFrom: " + request.email  },
      },

      Subject: { Data: request.subject },
    },
    // source email, note that this email needs to be verified via SES to send emails
    Source: "INSERT EMAIL ADDRESS",
  };
 
 try {
  let data = await ses.sendEmail(params).promise();
  let response = {
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "INSERT DOMAIN FOR CORS",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    "body": "Email was sent, ID: " + JSON.stringify(data.MessageId)
  };
  return response;
 } catch(err) {
   return err;
 }
};
