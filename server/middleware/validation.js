export function validateUrl(req, res, next) {
  const { url } = req.body
  
  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'URL is required'
    })
  }
  
  try {
    new URL(url)
    next()
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid URL format'
    })
  }
}

export function validateAnalysisRequest(req, res, next) {
  const { competitorUrl, industry, mainChallenge } = req.body
  
  const errors = []
  
  if (!competitorUrl) {
    errors.push('Competitor URL is required')
  } else {
    try {
      new URL(competitorUrl)
    } catch (error) {
      errors.push('Invalid competitor URL format')
    }
  }
  
  if (!industry) {
    errors.push('Industry is required')
  }
  
  if (!mainChallenge) {
    errors.push('Main challenge is required')
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    })
  }
  
  next()
}
