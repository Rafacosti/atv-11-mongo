const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editora: { type: String, required: true },
    ano: { type: Number, required: true },
    preco: { type: Number, required: true, min: 0 }
  },
  {
    timestamps: true
  }
)

const LivroModel = mongoose.model('Livros', schema)
module.exports = LivroModel