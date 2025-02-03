import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import SocietyDashboard from './pages/SocietyDashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectSociety from './utils/ProtectSociety'
import ProtectAdmin from './utils/ProtectAdmin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login/>} />
        <Route element={<ProtectAdmin />} >
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectSociety />} >
          <Route path="/society" element={<SocietyDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
