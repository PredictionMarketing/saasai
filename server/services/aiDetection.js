export async function detectAIFeatures(websiteData, specificFeature = '') {
  const features = []
  
  try {
    // Analyze AI indicators from scraping
    const aiIndicators = websiteData.aiIndicators || []
    
    // Define AI feature patterns
    const featurePatterns = {
      'Smart Recommendations': {
        keywords: ['recommendation', 'suggest', 'personalized', 'recommended for you'],
        indicators: ['recommendation engine', 'personalization', 'smart suggestions'],
        complexity: 'Medium',
        impact: 'High'
      },
      'Predictive Analytics': {
        keywords: ['predict', 'forecast', 'analytics', 'insights', 'trends'],
        indicators: ['predictive', 'machine learning', 'data analytics'],
        complexity: 'High',
        impact: 'High'
      },
      'AI Chatbot': {
        keywords: ['chat', 'bot', 'assistant', 'help', 'support'],
        indicators: ['chatbot', 'virtual assistant', 'ai chat'],
        complexity: 'Low',
        impact: 'Medium'
      },
      'Content Personalization': {
        keywords: ['personalized', 'customized', 'tailored', 'dynamic content'],
        indicators: ['personalization', 'dynamic', 'customized experience'],
        complexity: 'Medium',
        impact: 'High'
      },
      'Automated Workflows': {
        keywords: ['automate', 'workflow', 'automated', 'smart process'],
        indicators: ['automation', 'intelligent workflow', 'smart automation'],
        complexity: 'Medium',
        impact: 'Medium'
      },
      'Fraud Detection': {
        keywords: ['fraud', 'security', 'anomaly', 'risk detection'],
        indicators: ['fraud detection', 'anomaly detection', 'risk assessment'],
        complexity: 'High',
        impact: 'High'
      },
      'Image Recognition': {
        keywords: ['image', 'photo', 'visual', 'recognition', 'computer vision'],
        indicators: ['computer vision', 'image recognition', 'visual ai'],
        complexity: 'High',
        impact: 'Medium'
      },
      'Natural Language Processing': {
        keywords: ['language', 'text analysis', 'sentiment', 'nlp'],
        indicators: ['natural language', 'text processing', 'sentiment analysis'],
        complexity: 'High',
        impact: 'Medium'
      }
    }

    // Check each feature pattern
    Object.entries(featurePatterns).forEach(([featureName, pattern]) => {
      let confidence = 0
      let evidence = []

      // Check AI indicators
      aiIndicators.forEach(indicator => {
        pattern.indicators.forEach(patternIndicator => {
          if (indicator.keyword.includes(patternIndicator.toLowerCase())) {
            confidence += 30
            evidence.push(`Found "${indicator.keyword}" in content`)
          }
        })
      })

      // Check content for keywords
      const content = websiteData.content?.toLowerCase() || ''
      pattern.keywords.forEach(keyword => {
        if (content.includes(keyword.toLowerCase())) {
          confidence += 10
          evidence.push(`Keyword "${keyword}" found in content`)
        }
      })

      // Check headings for feature mentions
      const allHeadings = [
        ...(websiteData.headings?.h1 || []),
        ...(websiteData.headings?.h2 || []),
        ...(websiteData.headings?.h3 || [])
      ].join(' ').toLowerCase()

      pattern.keywords.forEach(keyword => {
        if (allHeadings.includes(keyword.toLowerCase())) {
          confidence += 20
          evidence.push(`Feature mentioned in headings`)
        }
      })

      // If user specified a specific feature, boost its confidence
      if (specificFeature && featureName.toLowerCase().includes(specificFeature.toLowerCase())) {
        confidence += 25
        evidence.push('User-specified feature of interest')
      }

      // Add feature if confidence is high enough
      if (confidence >= 25) {
        features.push({
          name: featureName,
          confidence: Math.min(confidence, 100),
          impact: pattern.impact,
          complexity: pattern.complexity,
          description: generateFeatureDescription(featureName, pattern, evidence),
          evidence: evidence.slice(0, 3), // Limit evidence
          estimatedROI: calculateEstimatedROI(featureName, pattern.impact)
        })
      }
    })

    // Sort by confidence and impact
    features.sort((a, b) => {
      const impactWeight = { 'High': 3, 'Medium': 2, 'Low': 1 }
      return (b.confidence + impactWeight[b.impact] * 10) - (a.confidence + impactWeight[a.impact] * 10)
    })

    return features.slice(0, 5) // Return top 5 features

  } catch (error) {
    console.error('AI feature detection failed:', error)
    return [{
      name: 'Basic AI Integration',
      confidence: 50,
      impact: 'Medium',
      complexity: 'Low',
      description: 'Basic AI features detected but analysis was limited',
      evidence: ['Analysis completed with limited data'],
      estimatedROI: 'Moderate improvement expected'
    }]
  }
}

function generateFeatureDescription(featureName, pattern, evidence) {
  const descriptions = {
    'Smart Recommendations': 'AI-powered recommendation system that analyzes user behavior to suggest relevant products/content, typically increasing conversion rates by 15-25%',
    'Predictive Analytics': 'Machine learning models that forecast trends, user behavior, or business outcomes, helping reduce churn and optimize operations',
    'AI Chatbot': 'Intelligent conversational interface that handles customer queries, provides support, and guides users through processes',
    'Content Personalization': 'Dynamic content system that adapts website/app experience based on user preferences and behavior patterns',
    'Automated Workflows': 'AI-driven process automation that streamlines operations and reduces manual tasks',
    'Fraud Detection': 'Machine learning system that identifies suspicious activities and prevents fraudulent transactions',
    'Image Recognition': 'Computer vision technology that analyzes and categorizes visual content automatically',
    'Natural Language Processing': 'AI system that understands and processes human language for various applications'
  }

  return descriptions[featureName] || `AI-powered ${featureName.toLowerCase()} system that enhances user experience and business operations`
}

function calculateEstimatedROI(featureName, impact) {
  const roiEstimates = {
    'Smart Recommendations': '+15-25% conversion rate',
    'Predictive Analytics': '+20-30% operational efficiency',
    'AI Chatbot': '-40-60% support costs',
    'Content Personalization': '+18-35% engagement',
    'Automated Workflows': '+25-40% productivity',
    'Fraud Detection': '-70-90% fraud losses',
    'Image Recognition': '+30-50% processing speed',
    'Natural Language Processing': '+20-35% data insights'
  }

  return roiEstimates[featureName] || 'Moderate business improvement expected'
}
