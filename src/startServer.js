const net = require('net')

const defaultPort = 9876
const magicNumber = 424242

let server

function startServer (port) {
  server = net.createServer(handleNewClientConnection)
  const serverPort = Number.isInteger(port) ? port : defaultPort
  server.listen(serverPort, '127.0.0.1')
  console.log(`Server started on port ${serverPort}`)
}

function handleNewClientConnection (socket) {
  console.log(`New connection from ${socket.remoteAddress}`)
  socket.on('data', (data) => handleClientData(data, socket))
  socket.on('close', () => handleClientDisconnection(socket))
  socket.write(String(magicNumber))
}

function handleClientData (data, socket) {
  if (Number.parseInt(data) === magicNumber) {
    console.log(`Added as a remote destination by ${socket.remoteAddress}`)
    return
  }

  socket.destroy()
  console.log(`Unknown data received from ${socket.remoteAddress}, connection closed.`)
}

function handleClientDisconnection (socket) {
  console.log(`Connection closed from ${socket.remoteAddress}`)
}

module.exports = { startServer, defaultPort, magicNumber }
