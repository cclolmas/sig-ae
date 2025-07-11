import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Estoque } from './pages/Estoque'
import { Produtos } from './pages/Produtos'
import { Consumo } from './pages/Consumo'
import { Fornecedores } from './pages/Fornecedores'
import { AvaliacoesFAD } from './pages/AvaliacoesFAD'
import { Unidades } from './pages/Unidades'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <Header setSidebarOpen={setSidebarOpen} />
          
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/consumo" element={<Consumo />} />
              <Route path="/fornecedores" element={<Fornecedores />} />
              <Route path="/avaliacoes-fad" element={<AvaliacoesFAD />} />
              <Route path="/unidades" element={<Unidades />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

