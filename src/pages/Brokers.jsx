import React from 'react'

export default function Brokers({ data, search }) {
  const corretores = data?.corretores ?? []
  const filtro = (search || '').toLowerCase().trim()

  const rows = corretores.filter(c => {
    if (!filtro) return true
    return [c.nome, c.telefone].join(' ').toLowerCase().includes(filtro)
  })

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-2">Corretores</h2>
      <p className="text-white/70 mb-6">Rede de especialistas em locação.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rows.map(c => (
          <article key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-4 mb-4">
              <img src={c.imagem} alt={c.nome} className="w-16 h-16 rounded-full object-cover border border-white/20" />
              <div>
                <h3 className="text-xl font-semibold">{c.nome}</h3>
                <p className="text-white/70">{c.telefone}</p>
              </div>
            </div>
            <p className="text-cyan-300">Avaliação: {Number(c.avaliacao || 0).toFixed(1)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
