const fs = require('fs')
const  path  = require('path')
const fsExtra = require("fs-extra")
const moment = require('moment')
const rimraf = require("rimraf")

let iCount

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())

const directories = dirs(__dirname  + '/folders')

// copy source folder to destination
directories.map((item) => {
  fsExtra.copy(__dirname + '/folders/' + item + '/Arquivos', __dirname + '/folders/' + item, function (err) {
    if (err) {
      return console.error(err)
    }
    fs.readdir(`${__dirname}/folders/${item}`, (err, files) => {
      if (err) console.log('ERROR: ' + err)
      iCount = 0
      files.forEach(file => {
        if (file === 'Arquivos') return
        iCount++
        const extnameFile = path.extname(file)
        const nameFile = item + "_" + moment().format('DDMMYYYY') + "_" + iCount + extnameFile
        fs.rename(`${__dirname}/folders/${item}/${file}`, `${__dirname}/folders/${item}/${nameFile}`, (err) => {
          if (err) return console.log(err)
        })
        rimraf(`${__dirname}/folders/${item}/Arquivos`, function (err) {
          if (err) console.log(err)
          console.log("done")
        })
      })
    })
    console.log('Copy completed!')
  })
})
