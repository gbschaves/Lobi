import React, { useMemo, useRef, useState } from 'react'
import CrudTable from '../components/CrudTable'
import { fetchData, downloadData, readJsonFile, validateDataShape } from '../utils/data'

export default function Dashboard({ data, setData }) {
  const fileInputRef = useRef(null)
  const [notice, setNotice] = useState('')

  if (!data) return null

  const setEntity = (name, rows) => setData({ ...data, [name]: rows })

  const stats = useMemo(() => {
    const totalPortfolio = data.imoveis.length
    const ativas = data.propostas.filter(p => String(p.status).toLowerCase() === 'aprovada').length
    const pendentes = data.propostas.filter(p => String(p.status).toLowerCase() !== 'aprovada').length
    return { totalPortfolio, ativas, pendentes }
  }, [data])

  async function reloadFromJson() {
    const fresh = await fetchData(true)
    setData(fresh)
    setNotice('Dados recarregados do JSON de origem.')
  }

  function triggerImport() {
    fileInputRef.current?.click()
  }

  async function onImportJson(event) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const parsed = await readJsonFile(file)
      if (!validateDataShape(parsed)) {
        setNotice('JSON inválido: precisa conter arrays de imobiliarias, imoveis, corretores e propostas.')
        return
      }
      setData(parsed)
      setNotice('JSON importado com sucesso.')
    } catch (error) {
      setNotice(error.message || 'Erro ao importar JSON.')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Painel de controle (CRUD)</h2>
        <div className="flex gap-2">
          <button className="btn" onClick={reloadFromJson}>Recarregar JSON de origem</button>
          <button className="btn" onClick={triggerImport}>Importar JSON</button>
          <button className="btn" onClick={() => downloadData(data)}>Baixar JSON atualizado</button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={onImportJson}
        />
      </div>

      {notice && <p className="text-sm mb-4 text-cyan-200">{notice}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel p-5 rounded-xl border border-white/10">
          <p className="text-white/70">Total de imóveis</p>
          <p className="text-3xl font-bold mt-2">{stats.totalPortfolio}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-white/10">
          <p className="text-white/70">Propostas aprovadas</p>
          <p className="text-3xl font-bold mt-2 text-green-300">{stats.ativas}</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-white/10">
          <p className="text-white/70">Propostas pendentes/revisão</p>
          <p className="text-3xl font-bold mt-2 text-amber-300">{stats.pendentes}</p>
        </div>
      </div>

      <CrudTable
        title="Imobiliárias"
        fields={[
          { name: 'nome', label: 'Nome', type: 'text' },
          { name: 'cidade', label: 'Cidade', type: 'text' }
        ]}
        rows={data.imobiliarias}
        onChange={rows => setEntity('imobiliarias', rows)}
      />

      <CrudTable
        title="Imóveis"
        fields={[
          { name: 'titulo', label: 'Título', type: 'text' },
          { name: 'cidade', label: 'Cidade', type: 'text' },
          { name: 'preco', label: 'Preço', type: 'number', min: 0, step: '0.01' },
          { name: 'corretorId', label: 'ID Corretor', type: 'number', min: 1 },
          { name: 'imagem', label: 'URL da Imagem', type: 'url', required: false }
        ]}
        rows={data.imoveis}
        onChange={rows => setEntity('imoveis', rows)}
      />

      <CrudTable
        title="Corretores"
        fields={[
          { name: 'nome', label: 'Nome', type: 'text' },
          {
            name: 'telefone',
            label: 'Telefone',
            type: 'text',
            pattern: '\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}',
            placeholder: '(11) 99999-0000'
          },
          { name: 'avaliacao', label: 'Avaliação', type: 'number', min: 0, step: '0.1', required: false },
          { name: 'imagem', label: 'URL da Foto', type: 'url', required: false }
        ]}
        rows={data.corretores}
        onChange={rows => setEntity('corretores', rows)}
      />

      <CrudTable
        title="Propostas"
        fields={[
          { name: 'imovelId', label: 'ID Imóvel', type: 'number', min: 1 },
          { name: 'cliente', label: 'Cliente', type: 'text' },
          { name: 'valor', label: 'Valor', type: 'number', min: 0, step: '0.01' },
          {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: ['Pendente', 'Revisão', 'Aprovada', 'Recusada']
          }
        ]}
        rows={data.propostas}
        onChange={rows => setEntity('propostas', rows)}
      />
    </section>
  )
}
