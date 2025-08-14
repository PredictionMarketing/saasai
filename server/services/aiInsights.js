export async function generateInsights(data) {
  const {
    competitorData,
    yourData,
    aiFeatures,
    marketContext,
    userContext
  } = data

  try {
    return generateRuleBasedInsights(data)
  } catch (error) {
    console.error('Insight generation failed:', error)
    return generateFallbackInsights(data)
  }
}

function generateRuleBasedInsights(data) {
  const { aiFeatures, userContext } = data

  // Determine market gap based on features found
  const marketGap = generateMarketGap(aiFeatures, userContext)
  
  // Get top recommendation
  const topFeature = aiFeatures[0]
  const recommendation = topFeature ? 
    `Start with ${topFeature.name} - it offers ${topFeature.impact.toLowerCase()} impact with ${topFeature.complexity.toLowerCase()} complexity. ${topFeature.estimatedROI}` :
    'Consider implementing basic AI chatbot as an entry point to AI features'

  // Generate implementation plan
  const implementationPlan = generateImplementationPlan(aiFeatures, userContext)

  // Calculate estimated impact
  const estimatedImpact = calculateBusinessImpact(aiFeatures, userContext)

  // Identify competitive advantages
  const competitiveAdvantages = generateCompetitiveAdvantages(aiFeatures, userContext)

  return {
    aiFeatures: aiFeatures.slice(0, 3),
    marketGap,
    recommendation,
    implementationPlan,
    estimatedImpact,
    competitiveAdvantages
  }
}

function generateMarketGap(aiFeatures, userContext) {
  if (aiFeatures.length === 0) {
    return `Your competitor appears to have limited AI implementation, giving you an opportunity to gain competitive advantage through AI adoption.`
  }

  const highImpactFeatures = aiFeatures.filter(f => f.impact === 'High')
  
  if (highImpactFeatures.length > 0) {
    return `Your competitor is using ${highImpactFeatures.length} high-impact AI feature(s) including ${highImpactFeatures[0].name}. This likely gives them significant advantages in ${userContext.mainChallenge?.toLowerCase() || 'user experience'}.`
  }

  return `Your competitor has implemented ${aiFeatures.length} AI feature(s). To compete effectively, you'll need similar capabilities plus additional innovations.`
}

function generateImplementationPlan(aiFeatures, userContext) {
  const plan = {
    phase1: "Foundation Setup",
    phase2: "Core AI Implementation", 
    phase3: "Advanced Features"
  }

  if (aiFeatures.length > 0) {
    const lowComplexity = aiFeatures.filter(f => f.complexity === 'Low')
    const mediumComplexity = aiFeatures.filter(f => f.complexity === 'Medium')
    const highComplexity = aiFeatures.filter(f => f.complexity === 'High')

    if (lowComplexity.length > 0) {
      plan.phase1 = `Implement ${lowComplexity[0].name} - quick win with immediate impact`
    }
    if (mediumComplexity.length > 0) {
      plan.phase2 = `Deploy ${mediumComplexity[0].name} - core competitive feature`
    }
    if (highComplexity.length > 0) {
      plan.phase3 = `Advanced ${highComplexity[0].name} - market differentiation`
    }
  }

  return plan
}

function calculateBusinessImpact(aiFeatures, userContext) {
  const userCount = parseInt(userContext.currentUsers?.split('-')[1]?.replace(/[^\d]/g, '')) || 1000
  
  let impact = {
    revenueIncrease: "10-20%",
    costReduction: "15-25%",
    userEngagement: "+25-40%",
    timeToValue: "2-4 months"
  }

  if (aiFeatures.some(f => f.name.includes('Recommendation'))) {
    impact.revenueIncrease = "20-35%"
  }
  
  if (aiFeatures.some(f => f.name.includes('Chatbot'))) {
    impact.costReduction = "30-50%"
  }

  if (userCount > 10000) {
    impact.timeToValue = "3-6 months"
  }

  return impact
}

function generateCompetitiveAdvantages(aiFeatures, userContext) {
  const advantages = []

  if (aiFeatures.some(f => f.impact === 'High')) {
    advantages.push("Improved user experience leading to higher retention")
    advantages.push("Data-driven decision making capabilities")
  }

  if (aiFeatures.some(f => f.name.includes('Predictive'))) {
    advantages.push("Proactive problem solving and trend identification")
  }

  if (aiFeatures.some(f => f.name.includes('Automation'))) {
    advantages.push("Reduced operational costs and improved efficiency")
  }

  advantages.push("Modern, AI-powered brand positioning")
  advantages.push("Scalable solutions that grow with your business")

  return advantages.slice(0, 4)
}

function generateFallbackInsights(data) {
  return {
    aiFeatures: data.aiFeatures?.slice(0, 3) || [],
    marketGap: "Analysis completed with limited data. Manual review recommended for comprehensive insights.",
    recommendation: "Consider starting with basic AI chatbot implementation as an entry point to AI features.",
    implementationPlan: {
      phase1: "Research and planning phase",
      phase2: "Basic AI feature implementation",
      phase3: "Advanced features and optimization"
    },
    estimatedImpact: {
      revenueIncrease: "10-15%",
      costReduction: "10-20%", 
      userEngagement: "+15-25%",
      timeToValue: "3-5 months"
    },
    competitiveAdvantages: [
      "Enhanced user experience",
      "Operational efficiency improvements",
      "Modern technology positioning",
      "Scalable AI foundation"
    ]
  }
}
