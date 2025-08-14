import React, { useState } from 'react'
import { Search, Globe, Users, TrendingUp, Zap, AlertCircle } from 'lucide-react'

export default function CompetitorAnalysis() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        competitorName: "Competitor Analysis",
        aiFeatures: [
          {
            name: "Smart Recommendations",
            impact: "High",
            description: "AI-powered product recommendations increase conversion by 23%",
            complexity: "Medium"
          },
          {
            name: "Predictive Analytics",
            impact: "High", 
            description: "Churn prediction helps retain 15% more customers",
            complexity: "High"
          },
          {
            name: "Automated Support",
            impact: "Medium",
            description: "AI chatbot handles 60% of support tickets",
            complexity: "Low"
          }
        ],
        marketGap: "Your competitor is using AI to reduce customer acquisition cost by 30% while you're still using manual processes.",
        recommendation: "Start with Smart Recommendations widget - highest ROI with medium complexity."
      })
      setIsAnalyzing(false)
    }, 3000)
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
          Competitor AI Analysis
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Submit a competitor's URL and we'll analyze their AI features, identify gaps in your offering, 
          and recommend custom widgets to help you compete.
        </p>
      </div>

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
                  Your Website *
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
                    required
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
                  Analyzing Competitor...
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
          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
            
            {/* Market Gap Alert */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-1">Market Gap Identified</h3>
                  <p className="text-amber-700">{analysisResult.marketGap}</p>
                </div>
              </div>
            </div>

            {/* AI Features Found */}
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
                      </div>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
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
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">1</span>
                </div>
                <p className="text-gray-700">We'll create a detailed project scope and timeline</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">2</span>
                </div>
                <p className="text-gray-700">Build your custom AI widget with your branding</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">3</span>
                </div>
                <p className="text-gray-700">Deploy with a single line of code integration</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
