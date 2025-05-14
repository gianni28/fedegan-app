import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Fincas from './pages/Fincas'
import Animales from './pages/Animales'
import Vacunaciones from './pages/Vacunaciones'

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold mb-6">FEDEGÁN</h1>
          <nav className="flex flex-col gap-2">
            <NavLink to="/" className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : ''}>Dashboard</NavLink>
            <NavLink to="/fincas" className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : ''}>Fincas</NavLink>
            <NavLink to="/animales" className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : ''}>Animales</NavLink>
            <NavLink to="/vacunaciones" className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : ''}>Vacunaciones</NavLink>
          </nav>
        </aside>
        <main className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fincas" element={<Fincas />} />
            <Route path="/animales" element={<Animales />} />
            <Route path="/vacunaciones" element={<Vacunaciones />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
