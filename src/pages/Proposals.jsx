import React from 'react'

export default function Proposals({ data, search }) {
  const propostas = data?.propostas ?? []
  const imoveis = data?.imoveis ?? []
  const byId = new Map(imoveis.map(i => [i.id, i]))
  const filtro = (search || '').toLowerCase().trim()

  const rows = propostas.filter(p => {
    const imovel = byId.get(Number(p.imovelId))
    const line = [p.cliente, p.status, imovel?.titulo, imovel?.cidade].join(' ').toLowerCase()
    return !filtro || line.includes(filtro)
  })

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-2">Propostas</h2>
      <p className="text-white/70 mb-6">Acompanhamento das propostas por imóvel.</p>

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Imóvel</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(p => {
              const imovel = byId.get(Number(p.imovelId))
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{imovel ? `${imovel.titulo} (${imovel.cidade})` : 'Imóvel não encontrado'}</td>
                  <td>R$ {Number(p.valor).toLocaleString('pt-BR')}</td>
                  <td>{p.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
