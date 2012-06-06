// copy this to config.js and modify

exports.config = {
  // see https://github.com/andris9/Nodemailer for more information on email options
  email_transport_type: 'SMTP',
  email_transport_options: {
  host: "my smpt server.com",
    auth: {
      user: 'my smtp user',
      pass: 'my smtp pass'
    }
  },
  email_from:'alarm@mydomain.com',
  // You can typicallysend text messages to a phone by using an email address like:
  // phonenumber@txt.att.net
  // phonenumber@vtext.com
  // phonenumber@tmomail.net
  email_to: 'user1@mydomain.com, 1234567890@txt.att.net'
}

