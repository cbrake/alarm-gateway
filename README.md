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

Set up an alarm system: https://github.com/cbrake/bec-arduino/tree/master/examples/RemoteAlarm

on the internet connected system (can be beaglebone) run: node alarm-monitor.js

# Details

This program simply monitors strings on a serial port.  If any contain the word "STATE", an email message is sent out.

One possible configuration is:

Battery powered JeeNode --(RF)--> JeeNode --(Serial/USB)--> Beaglebone --(Ethernet)--> Internet

# More information

todo