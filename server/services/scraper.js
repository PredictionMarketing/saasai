import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export async function scrapeWebsite(url) {
  try {
    console.log(`🕷️ Scraping: ${url}`)
    
    // First try with fetch for basic content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract basic information
    const data = {
      url,
      title: $('title').text().trim(),
      description: $('meta[name="description"]').attr('content') || '',
      keywords: $('meta[name="keywords"]').attr('content') || '',
      headings: {
        h1: $('h1').map((i, el) => $(el).text().trim()).get(),
        h2: $('h2').map((i, el) => $(el).text().trim()).get(),
        h3: $('h3').map((i, el) => $(el).text().trim()).get()
      },
      content: $('body').text().replace(/\s+/g, ' ').trim(),
      links: $('a[href]').map((i, el) => ({
        text: $(el).text().trim(),
        href: $(el).attr('href')
      })).get(),
      images: $('img[src]').map((i, el) => ({
        alt: $(el).attr('alt') || '',
        src: $(el).attr('src')
      })).get(),
      scripts: $('script[src]').map((i, el) => $(el).attr('src')).get(),
      // Look for AI-related indicators
      aiIndicators: extractAIIndicators($),
      // Extract pricing information
      pricing: extractPricingInfo($),
      // Extract feature lists
      features: extractFeatures($)
    }

    return data

  } catch (error) {
    console.error(`Scraping failed for ${url}:`, error.message)
    throw new Error(`Failed to scrape website: ${error.message}`)
  }
}

function extractAIIndicators($) {
  const aiKeywords = [
    'artificial intelligence', 'machine learning', 'ai-powered', 'ai-driven',
    'smart', 'intelligent', 'automated', 'predictive', 'recommendation',
    'chatbot', 'virtual assistant', 'natural language', 'computer vision',
    'deep learning', 'neural network', 'algorithm', 'personalization'
  ]

  const indicators = []
  const content = $('body').text().toLowerCase()

  aiKeywords.forEach(keyword => {
    if (content.includes(keyword)) {
      indicators.push({
        keyword,
        contexts: extractContexts($, keyword)
      })
    }
  })

  return indicators
}

function extractContexts($, keyword) {
  const contexts = []
  $('*').each((i, el) => {
    const text = $(el).text().toLowerCase()
    if (text.includes(keyword) && text.length < 200) {
      contexts.push($(el).text().trim())
    }
  })
  return contexts.slice(0, 3) // Limit to 3 contexts per keyword
}

function extractPricingInfo($) {
  const pricing = []
  
  // Look for common pricing patterns
  $('*').each((i, el) => {
    const text = $(el).text()
    const priceMatch = text.match(/\$\d+(?:,\d{3})*(?:\.\d{2})?(?:\/(?:month|mo|year|yr|user))?/gi)
    if (priceMatch) {
      pricing.push({
        text: text.trim(),
        prices: priceMatch
      })
    }
  })

  return pricing.slice(0, 10) // Limit results
}

function extractFeatures($) {
  const features = []
  
  // Look for feature lists (ul, ol with specific patterns)
  $('ul, ol').each((i, el) => {
    const items = $(el).find('li').map((j, li) => $(li).text().trim()).get()
    if (items.length > 2 && items.length < 20) {
      // Check if this looks like a feature list
      const hasFeatureKeywords = items.some(item => 
        /feature|benefit|capability|tool|solution|service/i.test(item)
      )
      if (hasFeatureKeywords || items.length > 5) {
        features.push({
          type: 'list',
          items: items
        })
      }
    }
  })

  return features.slice(0, 5) // Limit to 5 feature lists
}
