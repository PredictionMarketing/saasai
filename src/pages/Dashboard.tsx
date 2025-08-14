import React from 'react'
import { BarChart3, Users, TrendingUp, Zap, Settings, Eye } from 'lucide-react'

export default function Dashboard() {
  const projects = [
    {
      id: 1,
      name: "Smart Recommendations Widget",
      client: "TechCorp SaaS",
      status: "Live",
      performance: "+23% conversion",
      users: "12,450",
      revenue: "+$45K MRR"
    },
    {
      id: 2,
      name: "Churn Prediction Dashboard",
      client: "GrowthCo",
      status: "Development",
      performance: "In Progress",
      users: "8,200",
      revenue: "TBD"
    },
    {
      id: 3,
      name: "AI Support Assistant",
      client: "ServicePro",
      status: "Live",
      performance: "-60% tickets",
      users: "5,680",
      revenue: "+$28K savings"
    }
  ]

  const templates = [
    {
      name: "Recommendation Engine",
      category: "E-commerce",
      uses: 12,
      avgImpact: "+18% conversion"
    },
    {
      name: "Churn Predictor",
      category: "SaaS",
      uses: 8,
      avgImpact: "-25% churn"
    },
    {
      name: "Content Personalizer",
      category: "Media",
      uses: 6,
      avgImpact: "+35% engagement"
    },
    {
      name: "Price Optimizer",
      category: "E-commerce",
      uses: 4,
      avgImpact: "+12% revenue"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your AI widgets and explore our template library</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Widgets</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Zap className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">156K</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Revenue Impact</p>
              <p className="text-2xl font-bold text-gray-900">+$2.3M</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900">+19%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'Live' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Performance</p>
                    <p className="font-medium text-gray-900">{project.performance}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Users</p>
                    <p className="font-medium text-gray-900">{project.users}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-medium text-gray-900">{project.revenue}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Library */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Template Library</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {templates.map((template, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {template.category}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Used {template.uses} times</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Impact: <span className="font-medium text-green-600">{template.avgImpact}</span></p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-900">Smart Recommendations Widget deployed for TechCorp</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-900">New market research request from GrowthCo</p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 py-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-900">Churn Prediction template updated with new features</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
