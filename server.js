const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload')
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage }).single('arquivo')

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end('Ocorreu um erro.')
    }
    res.end('Concluído com sucesso.')
  })
})

app.post('/formulario', (req, res) => {
  res.send({
    ...req.body,
    id: 1
  })
})

app.listen(3000, () => console.log('Executando...'))