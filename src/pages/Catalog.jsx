import React from 'react'

export default function Catalog({ data, search }) {
  const imoveis = data?.imoveis ?? []
  const filtro = (search || '').toLowerCase().trim()

  const rows = imoveis.filter(i => {
    if (!filtro) return true
    return [i.titulo, i.cidade, i.preco].join(' ').toLowerCase().includes(filtro)
  })

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-2">Catálogo de Imóveis</h2>
      <p className="text-white/70 mb-6">Conteúdo carregado dinamicamente de `public/data.json`.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rows.map(imovel => (
          <article key={imovel.id} className="rounded-2xl border border-white/10 bg-[#1a1b22] overflow-hidden">
            <img src={imovel.imagem} alt={imovel.titulo} className="w-full h-44 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1">{imovel.titulo}</h3>
              <p className="text-white/70">{imovel.cidade}</p>
              <p className="mt-4 text-cyan-300 text-2xl font-bold">R$ {Number(imovel.preco).toLocaleString('pt-BR')}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
