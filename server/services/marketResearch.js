import { getMarketData } from './marketData.js'

export async function generateMarketResearch(params) {
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
  } = params

  try {
    // Get market context
    const marketContext = await getMarketData(industry)
    
    // Generate opportunities based on goals and challenges
    const opportunities = generateOpportunities(params, marketContext)
    
    // Analyze competitive gaps
    const competitiveGaps = generateCompetitiveGaps(industry, aiExperience, marketContext)
    
    // Create implementation recommendations
    const recommendations = generateRecommendations(opportunities, params)
    
    return {
      industryInsights: {
        marketSize: marketContext.marketSize,
        growthRate: marketContext.growthRate,
        aiAdoption: marketContext.aiAdoption
      },
      opportunities,
      competitiveGaps,
      recommendations,
      marketTrends: marketContext.keyTrends,
      generatedAt: new Date().toISOString()
    }

  } catch (error) {
    console.error('Market research generation failed:', error)
    throw new Error(`Market research failed: ${error.message}`)
  }
}

function generateOpportunities(params, marketContext) {
  const { mainGoal, currentChallenges, userCount, revenue, industry } = params
  
  const opportunities = []
  
  // Base opportunities by industry
  const industryOpportunities = {
    'saas': [
      {
        title: 'Predictive Customer Analytics',
        description: 'AI-powered customer behavior prediction to reduce churn and increase retention',
        priority: 'High',
        timeToValue: '3-4 months'
      },
      {
        title: 'Intelligent User Onboarding',
        description: 'Personalized onboarding flows that adapt to user behavior and preferences',
        priority: 'High',
        timeToValue: '2-3 months'
      },
      {
        title: 'Automated Customer Success',
        description: 'AI-driven customer health scoring and automated intervention workflows',
        priority: 'Medium',
        timeToValue: '4-5 months'
      }
    ],
    'ecommerce': [
      {
        title: 'Smart Product Recommendations',
        description: 'AI recommendation engine that increases average order value and conversion rates',
        priority: 'High',
        timeToValue: '2-3 months'
      },
      {
        title: 'Dynamic Pricing Optimization',
        description: 'Machine learning-powered pricing that maximizes revenue and competitiveness',
        priority: 'High',
        timeToValue: '3-4 months'
      },
      {
        title: 'Inventory Demand Forecasting',
        description: 'Predictive analytics for inventory management and demand planning',
        priority: 'Medium',
        timeToValue: '4-6 months'
      }
    ],
    'fintech': [
      {
        title: 'Advanced Fraud Detection',
        description: 'Real-time AI fraud detection that reduces false positives and catches sophisticated attacks',
        priority: 'High',
        timeToValue: '3-4 months'
      },
      {
        title: 'Credit Risk Assessment',
        description: 'AI-powered credit scoring using alternative data sources for better decisions',
        priority: 'High',
        timeToValue: '4-5 months'
      },
      {
        title: 'Automated Compliance Monitoring',
        description: 'AI system that monitors transactions and activities for regulatory compliance',
        priority: 'Medium',
        timeToValue: '5-6 months'
      }
    ]
  }

  // Get base opportunities for industry
  const baseOpportunities = industryOpportunities[industry] || industryOpportunities['saas']
  
  // Customize opportunities based on user goals and challenges
  baseOpportunities.forEach(opp => {
    const customizedOpp = { ...opp }
    
    // Calculate potential based on user size and revenue
    customizedOpp.potential = calculatePotential(opp, userCount, revenue, mainGoal)
    
    // Adjust priority based on main goal
    if (mainGoal === 'reduce-churn' && opp.title.includes('Customer')) {
      customizedOpp.priority = 'High'
    } else if (mainGoal === 'increase-revenue' && opp.title.includes('Revenue')) {
      customizedOpp.priority = 'High'
    }
    
    opportunities.push(customizedOpp)
  })

  // Add challenge-specific opportunities
  if (currentChallenges?.toLowerCase().includes('support')) {
    opportunities.push({
      title: 'AI Customer Support Assistant',
      description: 'Intelligent chatbot that handles common queries and escalates complex issues appropriately',
      priority: 'Medium',
      timeToValue: '1-2 months',
      potential: '$500K-800K cost savings annually'
    })
  }

  return opportunities.slice(0, 3) // Return top 3
}

function calculatePotential(opportunity, userCount, revenue, mainGoal) {
  // Parse user count
  const users = parseUserCount(userCount)
  const revenueNum = parseRevenue(revenue)
  
  // Base calculations
  let potential = ''
  
  if (opportunity.title.includes('Predictive') || opportunity.title.includes('Analytics')) {
    const churnReduction = Math.min(users * 0.25 * 50, revenueNum * 0.3) // Assume $50 LTV and 25% churn reduction
    potential = `$${formatNumber(churnReduction)} ARR increase`
  } else if (opportunity.title.includes('Recommendation')) {
    const conversionIncrease = revenueNum * 0.18 // 18% conversion increase
    potential = `$${formatNumber(conversionIncrease)} ARR increase`
  } else if (opportunity.title.includes('Support') || opportunity.title.includes('Automated')) {
    const costSavings = Math.min(users * 2, revenueNum * 0.15) // $2 per user or 15% of revenue
    potential = `$${formatNumber(costSavings)} cost savings`
  } else {
    // Default calculation
    const improvement = revenueNum * 0.12
    potential = `$${formatNumber(improvement)} ARR increase`
  }
  
  return potential
}

function parseUserCount(userCount) {
  if (!userCount) return 1000
  const match = userCount.match(/(\d+)/)
  return match ? parseInt(match[1]) : 1000
}

function parseRevenue(revenue) {
  if (!revenue) return 500000
  if (revenue.includes('100k-1m')) return 500000
  if (revenue.includes('1m-10m')) return 5000000
  if (revenue.includes('10m+')) return 15000000
  return 500000
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toString()
}

function generateCompetitiveGaps(industry, aiExperience, marketContext) {
  const gaps = []
  
  const adoptionRate = parseInt(marketContext.aiAdoption?.replace('%', '')) || 50
  
  // Generate gaps based on industry and AI adoption
  if (aiExperience === 'none' || !aiExperience) {
    gaps.push(`${adoptionRate}% of competitors in ${industry} have implemented AI features`)
    gaps.push(`${Math.round(adoptionRate * 0.8)}% use AI for customer analytics and insights`)
    gaps.push(`${Math.round(adoptionRate * 0.6)}% have automated customer support systems`)
  } else if (aiExperience === 'basic') {
    gaps.push(`${Math.round(adoptionRate * 0.7)}% of competitors use advanced predictive analytics`)
    gaps.push(`${Math.round(adoptionRate * 0.5)}% have implemented personalization engines`)
    gaps.push(`${Math.round(adoptionRate * 0.4)}% use AI for automated decision making`)
  }
  
  // Add industry-specific gaps
  if (marketContext.competitorFeatures) {
    marketContext.competitorFeatures.forEach(feature => {
      gaps.push(`Leading competitors are using ${feature} for competitive advantage`)
    })
  }
  
  return gaps.slice(0, 4) // Limit to 4 gaps
}

function generateRecommendations(opportunities, params) {
  const { timeline, budget } = params
  
  // Sort opportunities by priority and timeline fit
  const sortedOpportunities = opportunities.sort((a, b) => {
    const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 }
    return priorityWeight[b.priority] - priorityWeight[a.priority]
  })
  
  const recommendations = {
    phase1: sortedOpportunities[0]?.title || 'Basic AI implementation',
    phase2: sortedOpportunities[1]?.title || 'Advanced analytics integration',
    phase3: sortedOpportunities[2]?.title || 'Full AI automation suite'
  }
  
  // Adjust based on timeline
  if (timeline === 'asap') {
    recommendations.phase1 = 'Quick-win AI chatbot implementation'
    recommendations.phase2 = sortedOpportunities[0]?.title || 'Core AI features'
  }
  
  return recommendations
}
