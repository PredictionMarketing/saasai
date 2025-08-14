import React, { useState } from 'react'
import { Search, Globe, Users, TrendingUp, Zap, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { analyzeCompetitor } from '../services/api'
import type { CompetitorAnalysisRequest } from '../services/api'

export default function CompetitorAnalysis() {
  const [formData, setFormData] = useState<CompetitorAnalysisRequest>({
    competitorUrl: '',
    yourWebsite: '',
    industry: '',
    currentUsers: '',
    mainChallenge: '',
    specificFeature: '',
    timeline: '',
    budget: ''
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    setError(null)
    
    try {
      console.log('🔍 Starting real competitor analysis...')
      const analysis = await analyzeCompetitor(formData)
      setAnalysisResult(analysis)
    } catch (err) {
      console.error('Analysis failed:', err)
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Real Competitor AI Analysis
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Submit a competitor's URL and we'll analyze their AI features, identify gaps in your offering, 
          and recommend custom widgets to help you compete.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {!analysisResult ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Competitor URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    name="competitorUrl"
                    value={formData.competitorUrl}
                    onChange={handleInputChange}
                    placeholder="https://competitor.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    name="yourWebsite"
                    value={formData.yourWebsite}
                    onChange={handleInputChange}
                    placeholder="https://yoursite.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select Industry</option>
                  <option value="saas">SaaS/Software</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="fintech">FinTech</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Users
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    name="currentUsers"
                    value={formData.currentUsers}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Range</option>
                    <option value="0-1000">0 - 1,000</option>
                    <option value="1000-10000">1,000 - 10,000</option>
                    <option value="10000-100000">10,000 - 100,000</option>
                    <option value="100000+">100,000+</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Challenge *
              </label>
              <textarea
                name="mainChallenge"
                value={formData.mainChallenge}
                onChange={handleInputChange}
                placeholder="What's your biggest challenge? (e.g., high churn rate, low conversion, customer acquisition cost)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Feature Interest (Optional)
              </label>
              <input
                type="text"
                name="specificFeature"
                value={formData.specificFeature}
                onChange={handleInputChange}
                placeholder="Any specific AI feature you want to emulate? (e.g., their chatbot, recommendation engine)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Timeline</option>
                  <option value="asap">ASAP (Rush)</option>
                  <option value="1month">Within 1 Month</option>
                  <option value="3months">Within 3 Months</option>
                  <option value="6months">Within 6 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Budget</option>
                  <option value="5k-15k">$5K - $15K</option>
                  <option value="15k-50k">$15K - $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k+">$100K+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Competitor... (This may take 30-60 seconds)
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Analyze Competitor
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800">Analysis completed successfully!</p>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Analysis Results for {analysisResult.competitorName}
            </h2>
            
            {/* Market Gap Alert */}
            {analysisResult.marketGap && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">Market Gap Identified</h3>
                    <p className="text-amber-700">{analysisResult.marketGap}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Features Found */}
            {analysisResult.aiFeatures && analysisResult.aiFeatures.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Features Identified</h3>
                <div className="grid gap-4">
                  {analysisResult.aiFeatures.map((feature: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            feature.impact === 'High' ? 'bg-red-100 text-red-800' :
                            feature.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {feature.impact} Impact
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            feature.complexity === 'High' ? 'bg-red-100 text-red-800' :
                            feature.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {feature.complexity} Complexity
                          </span>
                          {feature.confidence && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {feature.confidence}% Confidence
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{feature.description}</p>
                      {feature.estimatedROI && (
                        <p className="text-sm text-green-600 font-medium">Expected Impact: {feature.estimatedROI}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation */}
            {analysisResult.recommendation && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Our Recommendation</h3>
                    <p className="text-primary-800 mb-4">{analysisResult.recommendation}</p>
                    <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                      Get Custom Quote
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Implementation Plan */}
            {analysisResult.implementationPlan && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Roadmap</h3>
                <div className="space-y-3">
                  {Object.entries(analysisResult.implementationPlan).map(([phase, description], index) => (
                    <div key={phase} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">{phase.replace(/([A-Z])/g, ' $1')}</h4>
                        <p className="text-gray-600">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Impact */}
            {analysisResult.estimatedImpact && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Business Impact</h3>
                  <div className="space-y-3">
                    {Object.entries(analysisResult.estimatedImpact).map(([metric, value]) => (
                      <div key={metric} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {analysisResult.competitiveAdvantages && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitive Advantages</h3>
                    <ul className="space-y-2">
                      {analysisResult.competitiveAdvantages.map((advantage: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Zap className="h-4 w-4 text-primary-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <button
              onClick={() => {
                setAnalysisResult(null)
                setFormData({
                  competitorUrl: '',
                  yourWebsite: '',
                  industry: '',
                  currentUsers: '',
                  mainChallenge: '',
                  specificFeature: '',
                  timeline: '',
                  budget: ''
                })
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Analyze Another Competitor
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
