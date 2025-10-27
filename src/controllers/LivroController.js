const express = require('express')
const router = express.Router()
const LivroModel = require('../models/Livro')


const { validarNovoLivro, validarAtualizaLivro } = require('../validators/LivroValidator')
const { validarID } = require('../validators/IDValidator')


router.post('/livros', validarNovoLivro, async (req, res, next) => {
  try {
    const dados = req.body
    const livroCadastrado = await LivroModel.create(dados)
    res.status(201).json(livroCadastrado)
  } catch (error) {
    next(error)
  }
})


router.get('/livros', async (req, res, next) => {
  try {
    const livros = await LivroModel.find()
    res.json(livros)
  } catch (error) {
    next(error)
  }
})


router.get('/livros/:id', validarID, async (req, res, next) => {
  try {
    const livro = await LivroModel.findById(req.params.id)
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado!" })
    res.json(livro)
  } catch (error) {
    next(error)
  }
})

router.put('/livros/:id', validarID, validarAtualizaLivro, async (req, res, next) => {
  try {
    const id = req.params.id
    const novosDados = req.body
    const livroAtualizado = await LivroModel.findByIdAndUpdate(id, novosDados, { new: true })
    if (!livroAtualizado) return res.status(404).json({ erro: "Livro não encontrado!" })
    res.json(livroAtualizado)
  } catch (error) {
    next(error)
  }
})


router.delete('/livros/:id', validarID, async (req, res, next) => {
  try {
    const id = req.params.id
    await LivroModel.findByIdAndDelete(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router