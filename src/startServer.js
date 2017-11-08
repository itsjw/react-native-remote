module.exports = function (port) {
  console.log(`This script will eventually start a server${Number.isInteger(port) ? ` on port ${port}` : ''}`)
}
