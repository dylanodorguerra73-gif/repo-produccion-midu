const { z } = require('zod')

const schemaMovie = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1),
  duracion: z.string().min(1),
  genero: z.array(z.string())
})

function validatePartialMovie (movie) {
  return schemaMovie.partial().safeParse(movie)
}

module.exports = { validatePartialMovie }
