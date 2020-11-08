const AWS = require('aws-sdk');
require('dotenv').config();

const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const params = {
  Destination: {
    ToAddresses: [process.env.DESTINATION_EMAIL], // replace with your destination email
  },
  Message: {
    Body: {
      Html: {
        // HTML Content for email
        Charset: 'UTF-8',
        Data:
          '<html><body><p>You are learning how to send and monitor email using Amazon SES and AWS Lambda.</p></body></html>',
      },
    },
    Subject: {
      // Subject for email
      Charset: 'UTF-8',
      Data: 'SES email sending tutorial',
    },
  },
  Source: process.env.SOURCE_EMAIL, // replace with your source email
};

const sendEmail = ses.sendEmail(params).promise();

sendEmail
  .then((data) => console.log('response ==>', data))
  .catch((err) => console.error('email sending error: ', err));
