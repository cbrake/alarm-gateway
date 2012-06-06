# alarm-gateway

Internet gateway for an alarm system.

This is a program that monitors a remote alarm system and sends emails to users when the alarm state changes.  Using email->text gateways provided by most cell phone carriers, you can easily send text messages to phones when alarm events occur.  With a combination of JeeNode, BeagleBone, and NodeJS technology, it is possible to quickly create an alarm system that will:

* monitor battery powered sensors in a building or short distances from buildings
* activate audiable alarms in the building
* send email/text messages when the alarm state changes

This program can run on any computer system that is:

* connected to the Internet
* runs node.js
* has a USB port

# Installation 

One possible configuration is:

Battery powered JeeNode --(RF)--> JeeNode --(Serial/USB)--> Beaglebone --(Ethernet)--> Internet

In this case we have the following components:

* Battery powered JeeNode sensor:  This tyep of node can run for many months from several AA batteries.
* JeeNode RF to Serial gateway:  Receives transmissions from sensor nodes, activates audible alarms, and sends state information out the serial port.
* Beaglebone (or PC, etc): receives serial data from JeeNode, and sends out emails, text messages, etc.

## RF System

An example system for the alarms is located here: https://github.com/cbrake/bec-arduino/tree/master/examples/RemoteAlarm

## Gateway

This is the device this program runs on (Beaglebone, etc).  Copy the config-example.js to config.js and modify for your setup.  The gateway simply monitors text on the serial port.  If it sees the word STATE in any of the messages, it sends emails, and optionally a configured message.

on the Gateway system (can be beaglebone):
    cd <this directory>
    npm install nodemailer serialport2
    node app.js

# More information

todo