var SerialPort = require('serialport2').SerialPort
var port = new SerialPort()
var nodemailer = require('nodemailer')
var config = require('./config').config

var transport = nodemailer.createTransport(config.email.transport.type, config.email.transport.options)

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
    from: config.email.from,
    to: config.email.to,
    subject: "Alarm change: " + state
  }

  // check if we have a message to send with this state
  for (var k in config.messages) {
    if (state.indexOf(k) >= 0) {
      mailOptions.text = config.messages[k]
      break
    }
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

port.open(config.serial.port, {
  baudRate: config.serial.baud,
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



