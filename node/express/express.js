const express = require('express')
const data = require('./json.json')
const app = express()
const { validatePartialMovie } = require('./validate.js')

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.post('/movies', (req, res) => {
  const genero = req.query.genero
  if (genero) {
    const filterMovie = data.filter(movie => movie.genero.some(g => g.toLocaleLowerCase() === genero.toLocaleLowerCase()))
    res.json(filterMovie)
  }
})
app.get('/movies', (_, res) => {
  res.json(data)
})
app.delete('/movie/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = data.findIndex(movie => movie.id === id)
  res.json(data[movieIndex].nombre)
}
)

app.patch('/movie/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  const { id } = req.params
  const movieIndex = data.findIndex(movie => movie.id === id)
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() })
  }
  const updateMovie = {
    ...data[movieIndex],
    ...result.data
  }

  data[movieIndex] = updateMovie
  res.json(updateMovie)
})
const PORT= process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`servidor levantado en el puerto ${PORT}`)
}

)
