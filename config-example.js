// copy this to config.js and modify

exports.config = {
  // serial port setup
  serial: {
    port: '/dev/ttyUSB1',
    baud: 57600
  },
  // see https://github.com/andris9/Nodemailer for more information on email options
  email : {
    transport: {
      type: 'SMTP',
      options: {
      service: 'Gmail',
        auth: {
          user: 'gmail.user@gmail.com',
          pass: 'my gmail pass'
        }
      }
    },
    from: 'alarm@mydomain.com',
    // You can typicallysend text messages to a phone by using an email address like:
    // phonenumber@txt.att.net
    // phonenumber@vtext.com
    // phonenumber@tmomail.net
    to: 'user1@mydomain.com, 1234567890@txt.att.net'
  },

  // the following messages will be included in emails for specified states
  messages: {
    NORMAL: "Alarm system is back to normal -- Thx, the chickens",
    SENSOR_ERROR: "A problem is detected in the alarm system. This is not an emergency, but please contact technical support.  Thx, the chickens",
    ALARM: "HELP, our perimeter alarm has been triggered!  We may be attacked by wild dogs!  Thx, the chickens"
  }
}

