import { scrapeWebsite } from './scraper.js'
import { detectAIFeatures } from './aiDetection.js'
import { generateInsights } from './aiInsights.js'
import { getMarketData } from './marketData.js'

export async function analyzeCompetitor(params) {
  const {
    competitorUrl,
    yourWebsite,
    industry,
    currentUsers,
    mainChallenge,
    specificFeature,
    timeline,
    budget
  } = params

  try {
    // Step 1: Scrape competitor website
    console.log('📄 Scraping competitor website...')
    const competitorData = await scrapeWebsite(competitorUrl)
    
    // Step 2: Scrape your website for comparison
    let yourData = null
    if (yourWebsite) {
      console.log('📄 Scraping your website...')
      yourData = await scrapeWebsite(yourWebsite)
    }

    // Step 3: Detect AI features
    console.log('🤖 Detecting AI features...')
    const aiFeatures = await detectAIFeatures(competitorData, specificFeature)

    // Step 4: Get market context
    console.log('📊 Gathering market data...')
    const marketContext = await getMarketData(industry)

    // Step 5: Generate insights and recommendations
    console.log('💡 Generating insights...')
    const insights = await generateInsights({
      competitorData,
      yourData,
      aiFeatures,
      marketContext,
      userContext: {
        industry,
        currentUsers,
        mainChallenge,
        timeline,
        budget
      }
    })

    return {
      competitorName: competitorData.title || 'Competitor',
      competitorUrl,
      aiFeatures: insights.aiFeatures,
      marketGap: insights.marketGap,
      recommendation: insights.recommendation,
      implementationPlan: insights.implementationPlan,
      estimatedImpact: insights.estimatedImpact,
      competitiveAdvantages: insights.competitiveAdvantages,
      analysisDate: new Date().toISOString()
    }

  } catch (error) {
    console.error('Competitor analysis failed:', error)
    throw new Error(`Analysis failed: ${error.message}`)
  }
}
