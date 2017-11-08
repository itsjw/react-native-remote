#!/usr/bin/env node

const program = require('commander')

const { startServer } = require('./startServer')
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
} else if (program.connect) {
  const socket = connectToServer(program.connect)
  socket.on('close', () => process.exit())
} else if (program.runIos) {
  runIOS()
  process.exit()
} else if (program.runAndroid) {
  runAndroid()
  process.exit()
} else {
  program.outputHelp()
}
