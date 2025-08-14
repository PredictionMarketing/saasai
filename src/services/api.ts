const API_BASE_URL = 'http://localhost:3001/api'

export interface CompetitorAnalysisRequest {
  competitorUrl: string
  yourWebsite?: string
  industry: string
  currentUsers?: string
  mainChallenge: string
  specificFeature?: string
  timeline?: string
  budget?: string
}

export interface MarketResearchRequest {
  website?: string
  industry: string
  userCount?: string
  revenue?: string
  mainGoal: string
  currentChallenges: string
  aiExperience?: string
  timeline?: string
  budget?: string
}

export async function analyzeCompetitor(data: CompetitorAnalysisRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/competitor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Analysis failed')
    }

    return result.analysis
  } catch (error) {
    console.error('Competitor analysis failed:', error)
    throw error
  }
}

export async function generateMarketResearch(data: MarketResearchRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/market-research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Market research failed')
    }

    return result.research
  } catch (error) {
    console.error('Market research failed:', error)
    throw error
  }
}
