import express from 'express'
import { analyzeCompetitor } from '../services/competitorAnalysis.js'
import { generateMarketResearch } from '../services/marketResearch.js'
import { validateUrl, validateAnalysisRequest } from '../middleware/validation.js'

const router = express.Router()

// Competitor analysis endpoint
router.post('/competitor', validateAnalysisRequest, async (req, res) => {
  try {
    const {
      competitorUrl,
      yourWebsite,
      industry,
      currentUsers,
      mainChallenge,
      specificFeature,
      timeline,
      budget
    } = req.body

    console.log(`🔍 Starting analysis for: ${competitorUrl}`)
    
    const analysis = await analyzeCompetitor({
      competitorUrl,
      yourWebsite,
      industry,
      currentUsers,
      mainChallenge,
      specificFeature,
      timeline,
      budget
    })

    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Competitor analysis error:', error)
    res.status(500).json({
      success: false,
      error: 'Analysis failed',
      message: error.message
    })
  }
})

// Market research endpoint
router.post('/market-research', async (req, res) => {
  try {
    const {
      website,
      industry,
      userCount,
      revenue,
      mainGoal,
      currentChallenges,
      aiExperience,
      timeline,
      budget
    } = req.body

    console.log(`📊 Generating market research for: ${industry}`)
    
    const research = await generateMarketResearch({
      website,
      industry,
      userCount,
      revenue,
      mainGoal,
      currentChallenges,
      aiExperience,
      timeline,
      budget
    })

    res.json({
      success: true,
      research,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Market research error:', error)
    res.status(500).json({
      success: false,
      error: 'Market research failed',
      message: error.message
    })
  }
})

export default router
