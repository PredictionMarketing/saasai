import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Zap, Shield, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Custom AI Widgets for
              <span className="text-primary-600"> Your SAAS</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stop losing customers to competitors with better AI features. We analyze your market, 
              build custom AI widgets, and help you deploy them with a single line of code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/competitor-analysis"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                Analyze Competitor <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/market-research"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Get Market Research
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How AI Upgrade Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get custom AI features that increase retention and revenue
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Submit & Analyze
              </h3>
              <p className="text-gray-600">
                Give us a competitor URL or request market research. We'll analyze what AI features 
                are driving their success and identify opportunities for your SAAS.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Custom Build
              </h3>
              <p className="text-gray-600">
                We build a custom AI widget tailored to your needs. No generic solutions - 
                each widget is designed specifically for your market and user base.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Deploy & Scale
              </h3>
              <p className="text-gray-600">
                Deploy with a single line of code. We handle hosting, security, and updates. 
                Optional analytics help you optimize performance over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose AI Upgrade?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Market Intelligence</h3>
                    <p className="text-gray-600">
                      We don't just build widgets - we analyze your competitive landscape 
                      to identify the highest-impact AI features for your specific market.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Zap className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Rapid Deployment</h3>
                    <p className="text-gray-600">
                      From analysis to deployment in weeks, not months. Our widget architecture 
                      works with any tech stack - just add one line of code.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                    <p className="text-gray-600">
                      Secure, sandboxed widgets that don't access your sensitive data. 
                      We handle compliance, updates, and scaling automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-6">
                  Submit a competitor URL or request market research to see what AI features 
                  could transform your SAAS.
                </p>
                <div className="space-y-3">
                  <Link
                    to="/competitor-analysis"
                    className="block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Analyze Competitor
                  </Link>
                  <Link
                    to="/market-research"
                    className="block border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                  >
                    Request Market Research
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
