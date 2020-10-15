const fs = require('fs')
const path = require('path');

function getPackages () {
  const files = fs.readdirSync(path.resolve(__dirname, '../interactions'))
  const paths = []
  for (const file of files) {
    const packDir = path.resolve(__dirname, `../interactions/${file}`)
    paths.push(packDir)
  }
  return paths
}

module.exports = {
  getPackages
}
