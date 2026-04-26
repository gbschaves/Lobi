import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import Brokers from './pages/Brokers'
import Proposals from './pages/Proposals'
import Loading from './components/Loading'
import { fetchData } from './utils/data'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // initial load (simulate brief loading to show animation)
    fetchData().then(d => {
      setData(d)
      setTimeout(() => setLoading(false), 2800)
    })
  }, [])

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-[#12131a] text-[#e3e1ec] flex">
      <aside className="hidden md:flex w-72 min-h-screen border-r border-white/10 bg-slate-950/40 backdrop-blur-xl flex-col p-6 gap-6">
        <div>
          <Link to="/" className="text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 to-violet-500 bg-clip-text text-transparent">
            {data?.app?.nome || 'Lobi'}
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">{data?.app?.slogan || 'Premium Living'}</p>
        </div>

        <nav className="flex flex-col gap-2">
          <MenuLink to="/catalog" icon="home_work" label="Imóveis" />
          <MenuLink to="/brokers" icon="handshake" label="Corretores" />
          <MenuLink to="/proposals" icon="description" label="Propostas" />
          <MenuLink to="/dashboard" icon="table" label="Painel CRUD" />
        </nav>

        <div className="mt-auto text-xs text-white/50">Projeto SPODWE2 • Front-end React</div>
      </aside>

      <div className="flex-1 min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 p-4 border-b border-white/10 bg-slate-950/30 backdrop-blur-xl flex items-center gap-3">
          <Link to="/" className="md:hidden font-bold text-2xl">{data?.app?.nome || 'Lobi'}</Link>
          <div className="ml-auto w-full max-w-xl relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-white/50">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por imóvel, cidade, corretor, cliente..."
              className="w-full pl-11 pr-3 py-2 rounded-lg bg-white/5 border border-white/10"
            />
          </div>
        </header>

        <main className="p-6 flex-1">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/catalog" element={<Catalog data={data} search={search} />} />
            <Route path="/brokers" element={<Brokers data={data} search={search} />} />
            <Route path="/proposals" element={<Proposals data={data} search={search} />} />
            <Route path="/dashboard" element={<Dashboard data={data} setData={setData} />} />
          </Routes>
        </main>

        <footer className="px-6 py-4 border-t border-white/10 text-sm text-white/60">
          {new Date().getFullYear()} © {data?.app?.nome || 'Lobi'} — Locação imobiliária
        </footer>
      </div>
    </div>
  )
}

function MenuLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg border transition ${
          isActive
            ? 'bg-white/10 border-cyan-300/50 text-cyan-300'
            : 'bg-white/0 border-transparent text-white/70 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}
