import React, { useState } from 'react'
import { TrendingUp, Target, Zap, DollarSign, Users, BarChart3, CheckCircle, XCircle } from 'lucide-react'
import { generateMarketResearch } from '../services/api'
import type { MarketResearchRequest } from '../services/api'

export default function MarketResearch() {
  const [formData, setFormData] = useState<MarketResearchRequest>({
    website: '',
    industry: '',
    userCount: '',
    revenue: '',
    mainGoal: '',
    currentChallenges: '',
    aiExperience: '',
    timeline: '',
    budget: ''
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [researchResult, setResearchResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    setError(null)
    
    try {
      console.log('📊 Starting real market research...')
      const research = await generateMarketResearch(formData)
      setResearchResult(research)
    } catch (err) {
      console.error('Market research failed:', err)
      setError(err instanceof Error ? err.message : 'Market research failed')
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
          Real AI Market Research
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get comprehensive market analysis and AI opportunity identification for your industry. 
          We'll recommend the highest-impact AI features for your specific business.
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

      {!researchResult ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yoursite.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

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
                  <option value="real-estate">Real Estate</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Users
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    name="userCount"
                    value={formData.userCount}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Range</option>
                    <option value="0-100k">$0 - $100K</option>
                    <option value="100k-1m">$100K - $1M</option>
                    <option value="1m-10m">$1M - $10M</option>
                    <option value="10m+">$10M+</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Business Goal *
              </label>
              <select
                name="mainGoal"
                value={formData.mainGoal}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select Primary Goal</option>
                <option value="increase-revenue">Increase Revenue</option>
                <option value="reduce-churn">Reduce Customer Churn</option>
                <option value="improve-conversion">Improve Conversion Rates</option>
                <option value="reduce-costs">Reduce Operational Costs</option>
                <option value="enhance-experience">Enhance User Experience</option>
                <option value="competitive-advantage">Gain Competitive Advantage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Challenges *
              </label>
              <textarea
                name="currentChallenges"
                value={formData.currentChallenges}
                onChange={handleInputChange}
                placeholder="What are your biggest business challenges? (e.g., high customer acquisition cost, low engagement, manual processes)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Experience Level
              </label>
              <select
                name="aiExperience"
                value={formData.aiExperience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Experience Level</option>
                <option value="none">No AI implementation</option>
                <option value="basic">Basic AI tools (chatbots, etc.)</option>
                <option value="intermediate">Some custom AI features</option>
                <option value="advanced">Advanced AI integration</option>
              </select>
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
                  Analyzing Market... (This may take 20-30 seconds)
                </>
              ) : (
                <>
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Get Market Research
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
              <p className="text-green-800">Market research completed successfully!</p>
            </div>
          </div>

          {/* Market Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {researchResult.industryInsights.marketSize}
                </div>
                <div className="text-gray-600">Market Size</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {researchResult.industryInsights.growthRate}
                </div>
                <div className="text-gray-600">Annual Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {researchResult.industryInsights.aiAdoption}
                </div>
                <div className="text-gray-600">AI Adoption Rate</div>
              </div>
            </div>
          </div>

          {/* AI Opportunities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Opportunities</h2>
            <div className="space-y-6">
              {researchResult.opportunities.map((opportunity: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{opportunity.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {opportunity.potential}
                      </div>
                      <div className={`px-3 py-1 text-sm font-medium rounded-full ${
                        opportunity.priority === 'High' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {opportunity.priority} Priority
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Time to Value: {opportunity.timeToValue}</span>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Get Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Gaps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitive Analysis</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-semibold text-amber-800 mb-4">What Your Competitors Are Doing</h3>
              <ul className="space-y-2">
                {researchResult.competitiveGaps.map((gap: string, index: number) => (
                  <li key={index} className="flex items-center text-amber-700">
                    <Target className="h-4 w-4 mr-2" />
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Implementation Roadmap</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phase 1 (Months 1-3)</h3>
                  <p className="text-gray-600">{researchResult.recommendations.phase1}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phase 2 (Months 4-6)</h3>
                  <p className="text-gray-600">{researchResult.recommendations.phase2}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phase 3 (Months 7-9)</h3>
                  <p className="text-gray-600">{researchResult.recommendations.phase3}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Schedule Strategy Call
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <button
              onClick={() => {
                setResearchResult(null)
                setFormData({
                  website: '',
                  industry: '',
                  userCount: '',
                  revenue: '',
                  mainGoal: '',
                  currentChallenges: '',
                  aiExperience: '',
                  timeline: '',
                  budget: ''
                })
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Generate New Research
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
