import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

async function createServer() {
  const app = express()
  app.use(express.json())

  app.post('/api/reverse-geocoding', async (req, res) => {
    const { lat, lng } = req.body

    const response = await fetch(
      `${process.env.REVERSE_GEOCODING_URL}lat=${lat}&lng=${lng}&username=${process.env.REVERSE_GEOCODING_USERNAME}`
    )

    const data = await response.json()
    res.status(200).json({ message: 'recevied geocode', data })
  })

  let vite
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa', // to avoid Vite's own HTML rendering logic, and use parent server.js instead
    })

    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist/client')))
  }

  app.listen(5173, () => {
    console.log(`Server started at http://localhost:5173`)
  })
}

createServer()
