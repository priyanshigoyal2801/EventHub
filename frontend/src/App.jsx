import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import SocietyDashboard from './pages/SocietyDashboard'
import CreateEvents from './pages/SubmitApplication'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectSociety from './utils/ProtectSociety'
import ProtectAdmin from './utils/ProtectAdmin'
import StatsPage from './pages/StatsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/stats" element={<StatsPage/>} />

        <Route element={<ProtectAdmin />} >
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectSociety />} >
          <Route path="/society/:id" element={<SocietyDashboard />} />
          <Route path="/society/create-event" element={<CreateEvents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
