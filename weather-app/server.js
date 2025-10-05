import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 5173

async function createServer() {
  const app = express()
  app.use(express.json())

  // API route - defined first to ensure it takes precedence
  app.post('/api/reverse-geocoding', async (req, res) => {
    try {
      const { lat, lng } = req.body

      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude are required' })
      }

      const response = await fetch(
        `${process.env.REVERSE_GEOCODING_URL}lat=${lat}&lng=${lng}&username=${process.env.REVERSE_GEOCODING_USERNAME}`
      )

      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })

  let vite
  if (!isProduction) {
    // Development: Create Vite server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom', // Changed from 'spa' to 'custom' for better SSR compatibility
    })

    app.use(vite.middlewares)
  } else {
    // Production: Serve static files from client build
    app.use(
      express.static(path.resolve(__dirname, 'dist/client'), {
        index: false, // Let SPA fallback handle index.html
      })
    )
  }

  // SPA Fallback - must be the last route
  app.get('*', async (req, res, next) => {
    try {
      if (isProduction) {
        // Production: Serve the built index.html
        const htmlPath = path.resolve(__dirname, 'dist/client/index.html')
        res.sendFile(htmlPath)
      } else {
        // Development: Use Vite's HTML transformation
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')

        template = await vite.transformIndexHtml(req.originalUrl, template)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
      }
    } catch (error) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error)
      }
      next(error)
    }
  })

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
    console.log(`Environment: ${isProduction ? 'production' : 'development'}`)
  })
}

createServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
