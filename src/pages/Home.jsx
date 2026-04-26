import React from 'react'

export default function Home({ data }) {
  const totalImoveis = data?.imoveis?.length ?? 0
  const totalCorretores = data?.corretores?.length ?? 0
  const totalPropostas = data?.propostas?.length ?? 0
  const totalImobiliarias = data?.imobiliarias?.length ?? 0

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
        {data?.app?.nome || 'Lobi'} • {data?.app?.nomeExpandido || 'Locação imobiliária'}
      </h1>
      <p className="text-white/70 mb-8">SPA em React para gestão de imóveis, corretores e propostas.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Imobiliárias" value={totalImobiliarias} />
        <Card title="Imóveis" value={totalImoveis} />
        <Card title="Corretores" value={totalCorretores} />
        <Card title="Propostas" value={totalPropostas} />
      </div>
    </section>
  )
}

function Card({ title, value }) {
  return (
    <article className="p-5 rounded-xl border border-white/10 bg-white/5">
      <p className="text-white/60">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </article>
  )
}
