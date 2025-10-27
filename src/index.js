const express = require('express')
const app = express()
app.use(express.json())

require('dotenv').config()
const mongoose = require('mongoose')

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT || 3000

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Clusterpro`;

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao MongoDB")
  })
  .catch(erro => {
    console.error("Erro ao conectar no MongoDB: ", erro)
  })


const LivroController = require('./controllers/LivroController')
app.use(LivroController)

app.listen(PORT, () => {
  console.log(`Aplicação rodando -> http://localhost:${PORT}`)
})