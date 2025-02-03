import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import SocietyDashboard from './pages/SocietyDashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/society" element={<SocietyDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
