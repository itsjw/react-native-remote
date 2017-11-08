const net = require('net')

const { defaultPort, magicNumber } = require('./startServer')
const setRemote = require('./setRemote')

let socket

function connectToServer (host) {
  socket = new net.Socket()

  // TODO: Split host to get address and port number.

  socket.connect(defaultPort, host, () => {
    console.log(`Connected to ${host}, waiting for verification...`)
  })

  socket.on('data', (data) => {
    if (Number.parseInt(data) === magicNumber) {
      console.log(`Verification successful! Setting ${host} as new remote destination.`)
      setRemote(host)
      socket.write(String(magicNumber), () => socket.destroy())
    } else {
      console.log('Verification failed. Are you sure you\'re connecting to a valid react-native-remote server?')
    }
  })

  return socket
}

module.exports = connectToServer
