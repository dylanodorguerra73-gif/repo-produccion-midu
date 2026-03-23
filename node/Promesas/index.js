const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const filepath = path.join('/Users/dylan/OneDrive/CursoProgramacion/Css/Postres/pagina/proyecto/CursoProgramacion/Elyam-site/elyam-site', 'index.html')
const PORT = 3000

const server = http.createServer((req, res) => {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain')
      res.end(console.log('error al leer archivo'))
    }
    res.status = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(data)
    console.log(req)
  })
}
)

server.listen(PORT, '::', () => {
  console.log(`escuchando desde el puerto${PORT}`)
})
