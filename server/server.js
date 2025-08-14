import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import analysisRoutes from './routes/analysis.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Rate limiting
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000']
}))
app.use(express.json({ limit: '10mb' }))

// Rate limiting middleware
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip)
    next()
  } catch (rejRes) {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Please try again later'
    })
  }
})

// Routes
app.use('/api/analysis', analysisRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Analysis Engine running on port ${PORT}`)
  console.log(`📊 Ready to analyze competitors and markets`)
})
