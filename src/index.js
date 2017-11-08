#!/usr/bin/env node

const program = require('commander')

const startServer = require('./startServer')
const connectToServer = require('./connectToServer')
const runIOS = require('./runIOS')
const runAndroid = require('./runAndroid')

const packageInformation = require('../package.json')

program
  .version(packageInformation.version)
  .usage('<option>')
  .option('start [port]', 'Start a remote server others can connect to', parseInt)
  .option('connect <host>', 'Connect to a remote server')
  .option('run-ios', 'Build and run for iOS on the remote server')
  .option('run-android', 'Build and run for Android on the remote server')
  .parse(process.argv)

if (program.start) {
  startServer(program.start)
  process.exit()
}

if (program.connect) {
  connectToServer(program.connect)
  process.exit()
}

if (program.runIos) {
  runIOS()
  process.exit()
}

if (program.runAndroid) {
  runAndroid()
  process.exit()
}

program.outputHelp()
