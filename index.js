const fs = require('fs')
const  path  = require('path')
const fsExtra = require("fs-extra")
const moment = require('moment')
let iCount

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())

const directories = dirs(__dirname  + '/folders')

// copy source folder to destination
directories.map((item) => {
  fsExtra.copy(__dirname + '/folders/' + item + '/Arquivos', __dirname + '/folders/' + item, function (err) {
    if (err) {
      return console.error(err)
    }
    console.log('Copy completed!')
  })
})

fs.readdir(__dirname + '/folders/22', (err, files) => {
  iCount = 0
  files.forEach(file => {
    if (file === 'Arquivos') return
    iCount++
    const extnameFile = path.extname(file)
    const nameFile = '22' + "_" + moment().format('DDMMYYYY') + "_0" + iCount + extnameFile
    fs.rename(file, nameFile, function (err) {
      if (err) console.log('ERROR: ' + err)
        console.log(file)
    })
  })
})