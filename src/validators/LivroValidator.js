const yup = require('yup')


const schemaNovoLivro = yup.object().shape({
  titulo: yup.string().min(1, 'titulo inválido').max(200).required('titulo é obrigatório'),
  autor: yup.string().min(1, 'autor inválido').max(100).required('autor é obrigatório'),
  editora: yup.string().min(1, 'editora inválida').max(100).required('editora é obrigatória'),
  ano: yup.number().integer('ano deve ser inteiro').required('ano é obrigatório'),
  preco: yup.number().positive('preco deve ser positivo').required('preco é obrigatório')
})


const schemaAtualizaLivro = yup.object().shape({
  titulo: yup.string().min(1).max(200),
  autor: yup.string().min(1).max(100),
  editora: yup.string().min(1).max(100),
  ano: yup.number().integer(),
  preco: yup.number().positive()
})

async function validarNovoLivro(req, res, next) {
  try {
    await schemaNovoLivro.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

async function validarAtualizaLivro(req, res, next) {
  try {
    await schemaAtualizaLivro.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = {
  validarNovoLivro,
  validarAtualizaLivro
}
