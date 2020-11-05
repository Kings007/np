const fs = require('fs')
const path = require('path')
const rootPath = process.cwd()
function createHTMLTemplete() {
  createDirectory('public', (dirPath) => {
    const fileName = 'index.html'
    const filePath = path.resolve(dirPath, fileName)
    console.log('index.html path: ', filePath)
    fs.writeFile(filePath, '', () => {
      const readStream = fs.createReadStream(path.join(__dirname, '../public/index.html'))
      const writeStream = fs.createWriteStream(filePath)
      readStream.pipe(writeStream)
    })
  })
}

function createSrcTemplete() {
  createDirectory('src', (dirPath) => {
    const fileName = 'index.js'
    const filePath = path.resolve(dirPath, fileName)
    console.log('index.js path: ', filePath)
    fs.writeFile(filePath, 'console.log("hello world")', () => {})
  })
}


function createDirectory(directoryName, cb) {
  const dirPath = path.resolve(rootPath, '../../', directoryName)
  fs.mkdir(dirPath, () => {
    cb(dirPath)
  })
}

createHTMLTemplete()
createSrcTemplete()