// Market intelligence data and industry insights
const marketData = {
  'saas': {
    marketSize: '$157.7B',
    growthRate: '18.7%',
    aiAdoption: '73%',
    avgChurnRate: '5-7%',
    keyTrends: ['AI-powered analytics', 'Predictive customer success', 'Automated workflows'],
    competitorFeatures: ['Smart dashboards', 'Predictive analytics', 'AI chatbots']
  },
  'ecommerce': {
    marketSize: '$5.7T',
    growthRate: '14.7%',
    aiAdoption: '67%',
    avgChurnRate: '70%',
    keyTrends: ['Personalized recommendations', 'Dynamic pricing', 'Visual search'],
    competitorFeatures: ['Recommendation engines', 'Chatbots', 'Fraud detection']
  },
  'fintech': {
    marketSize: '$312.3B',
    growthRate: '25.2%',
    aiAdoption: '78%',
    avgChurnRate: '3-5%',
    keyTrends: ['Fraud detection', 'Risk assessment', 'Robo-advisors'],
    competitorFeatures: ['Fraud detection', 'Credit scoring', 'Automated trading']
  },
  'healthcare': {
    marketSize: '$659.8B',
    growthRate: '9.9%',
    aiAdoption: '45%',
    avgChurnRate: '2-4%',
    keyTrends: ['Diagnostic AI', 'Patient monitoring', 'Drug discovery'],
    competitorFeatures: ['Diagnostic assistance', 'Patient triage', 'Predictive analytics']
  },
  'education': {
    marketSize: '$377.8B',
    growthRate: '16.3%',
    aiAdoption: '52%',
    avgChurnRate: '8-12%',
    keyTrends: ['Personalized learning', 'Automated grading', 'Student analytics'],
    competitorFeatures: ['Adaptive learning', 'AI tutoring', 'Performance analytics']
  },
  'marketing': {
    marketSize: '$594.8B',
    growthRate: '13.2%',
    aiAdoption: '69%',
    avgChurnRate: '6-9%',
    keyTrends: ['Programmatic advertising', 'Content generation', 'Customer segmentation'],
    competitorFeatures: ['Ad optimization', 'Content AI', 'Predictive analytics']
  }
}

export async function getMarketData(industry) {
  try {
    const industryKey = industry?.toLowerCase() || 'saas'
    const data = marketData[industryKey] || marketData['saas']
    
    // Add some dynamic elements
    const currentYear = new Date().getFullYear()
    
    return {
      ...data,
      lastUpdated: new Date().toISOString(),
      year: currentYear,
      // Add some calculated insights
      insights: generateMarketInsights(data, industryKey)
    }
  } catch (error) {
    console.error('Market data retrieval failed:', error)
    return {
      marketSize: 'Data unavailable',
      growthRate: 'N/A',
      aiAdoption: 'N/A',
      keyTrends: ['AI integration', 'Automation', 'Personalization'],
      competitorFeatures: ['Basic AI features']
    }
  }
}

function generateMarketInsights(data, industry) {
  const insights = []
  
  const adoptionRate = parseInt(data.aiAdoption?.replace('%', '')) || 50
  
  if (adoptionRate > 70) {
    insights.push(`High AI adoption (${data.aiAdoption}) in ${industry} means AI features are becoming table stakes`)
  } else if (adoptionRate > 50) {
    insights.push(`Moderate AI adoption (${data.aiAdoption}) presents opportunity for early competitive advantage`)
  } else {
    insights.push(`Low AI adoption (${data.aiAdoption}) means significant first-mover advantage potential`)
  }
  
  const growthRate = parseFloat(data.growthRate?.replace('%', '')) || 10
  if (growthRate > 20) {
    insights.push('High growth market - AI investment can capture expanding opportunity')
  } else if (growthRate > 10) {
    insights.push('Steady growth market - AI can help capture market share')
  } else {
    insights.push('Mature market - AI differentiation is crucial for competitive advantage')
  }
  
  insights.push(`Key competitive features: ${data.competitorFeatures?.join(', ')}`)
  
  return insights
}
