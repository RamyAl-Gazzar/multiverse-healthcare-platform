import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import FeasibilitySelection from './pages/feasibility/FeasibilitySelection'
import AutomatedFeasibility from './pages/feasibility/AutomatedFeasibility'
import ManualFeasibility from './pages/feasibility/ManualFeasibility'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="feasibility" element={<FeasibilitySelection />} />
          <Route path="feasibility/auto" element={<AutomatedFeasibility />} />
          <Route path="feasibility/manual" element={<ManualFeasibility />} />
          <Route path="*" element={<div className="container" style={{ padding: '8rem 0' }}>Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
