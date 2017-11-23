const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()

const uploadDir = 'uploads/'
const upload = multer({ dest: uploadDir })

// 3rd party middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

// routes
app.post('/upload', upload.single('file'), async (req, res, next) => {
  res.json(req.file)

  try {
    fs.readdir(uploadDir, (err, files) => {
      if (err) throw err

      for (const file of files) {
        fs.unlink(path.join(uploadDir, file), err => {
          if (err) throw err
        })
      }
    })
  } catch (error) {
    console.log('unable to read uploads for removal', error)
  }
})

module.exports = app
