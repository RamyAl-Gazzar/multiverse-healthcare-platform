import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import FeasibilitySelection from './pages/feasibility/FeasibilitySelection'
import AutomatedFeasibility from './pages/feasibility/AutomatedFeasibility'
import ManualFeasibility from './pages/feasibility/ManualFeasibility'
import SavedDrafts from './pages/feasibility/SavedDrafts'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageUsers from './pages/admin/ManageUsers'
import ManageStudies from './pages/admin/ManageStudies'
import './index.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="feasibility" element={<FeasibilitySelection />} />
            <Route path="feasibility/auto" element={<AutomatedFeasibility />} />
            <Route path="feasibility/manual" element={<ManualFeasibility />} />
            <Route path="feasibility/manual/:id" element={<ManualFeasibility />} />
            <Route path="feasibility/drafts" element={<SavedDrafts />} />
            <Route path="*" element={<div className="container" style={{ padding: '8rem 0' }}>Page Not Found</div>} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="studies" element={<ManageStudies />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
