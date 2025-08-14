import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CompetitorAnalysis from './pages/CompetitorAnalysis'
import MarketResearch from './pages/MarketResearch'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
        <Route path="/market-research" element={<MarketResearch />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
