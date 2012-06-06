var SerialPort = require('serialport2').SerialPort
var port = new SerialPort()
var nodemailer = require('nodemailer')
var config = require('./config').config

var transport = nodemailer.createTransport(config.email_transport_type, config.email_transport_options)

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}

var process_state = function(state) {
  var mailOptions = {
    from: config.email_from,
    to: config.email_to,
    subject: "Alarm change: " + state
  }

  transport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log("Message sent: " + response.message)
    }
  })
}

var process_line = function(line) {
  console.log('LINE: ' + line)
  if (line.indexOf('STATE') >= 0) {
    process_state(line)
  }
}

var process_serial_data = function(data) {
  var cr_i = data.indexOf('\n')
  if (cr_i < 0) {
    // left over data with no CR
    return data
  } else {
    // we have a complete line of data, process it
    process_line(data.slice(0, cr_i + 1).trim())
    // recursively process the rest of the data
    return process_serial_data(data.slice(cr_i + 1))
  }
}

var serial_buf = ''

port.on('data', function(data) {
  serial_buf = process_serial_data(serial_buf + data.toString())
})

port.on('error', function(err) {
  console.log(err);
})

port.open('/dev/ttyUSB1', {
  baudRate: 57600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1
}, function(err) {
  if (err) {
    console.log("Error opening port: " + err);
  } else {
    console.log("Serial port opened");
  }
})



