import React, { useMemo, useState } from 'react'

export default function CrudTable({ title, fields, rows, onChange }) {
  const [error, setError] = useState('')

  const normalizedFields = useMemo(() => {
    return fields.map(f => {
      if (typeof f === 'string') {
        return { name: f, label: f, type: 'text', required: true }
      }
      return {
        name: f.name,
        label: f.label || f.name,
        type: f.type || 'text',
        required: f.required ?? true,
        options: f.options || [],
        min: f.min,
        step: f.step,
        pattern: f.pattern,
        placeholder: f.placeholder || f.label || f.name
      }
    })
  }, [fields])

  const empty = useMemo(
    () => normalizedFields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
    [normalizedFields]
  )

  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  function parseByType(value, type) {
    if (type === 'number') return Number(value)
    return value
  }

  function normalizePayload() {
    return normalizedFields.reduce((acc, f) => {
      acc[f.name] = parseByType(form[f.name], f.type)
      return acc
    }, {})
  }

  function submit(e) {
    e.preventDefault()
    setError('')

    for (const f of normalizedFields) {
      const raw = String(form[f.name] ?? '').trim()
      if (f.required && !raw) {
        setError(`Preencha o campo "${f.label}".`)
        return
      }
      if (f.type === 'number' && raw && Number.isNaN(Number(raw))) {
        setError(`O campo "${f.label}" deve ser numérico.`)
        return
      }
    }

    const payload = normalizePayload()

    if (editingId) {
      const updated = rows.map(r => (r.id === editingId ? { ...r, ...payload, id: editingId } : r))
      onChange(updated)
      setEditingId(null)
      setForm(empty)
      return
    }

    const nextId = rows.length ? Math.max(...rows.map(r => Number(r.id) || 0)) + 1 : 1
    onChange([...rows, { id: nextId, ...payload }])
    setForm(empty)
  }

  function remove(id) {
    onChange(rows.filter(r => r.id !== id))
  }

  function edit(row) {
    setEditingId(row.id)
    const next = { ...empty }
    normalizedFields.forEach(f => { next[f.name] = row[f.name] ?? '' })
    setForm(next)
    setError('')
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(empty)
    setError('')
  }

  return (
    <section className="mb-10 p-5 rounded-xl border border-white/10 bg-white/5 glass-panel">
      <h3 className="text-2xl mb-4 font-semibold text-cyan-200">{title}</h3>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
        {normalizedFields.map(field => (
          field.type === 'select' ? (
            <select
              key={field.name}
              value={form[field.name]}
              onChange={e => setForm({ ...form, [field.name]: e.target.value })}
              className="px-3 py-2 rounded bg-black/30 border border-white/10"
              required={field.required}
            >
              <option value="">Selecione {field.label}</option>
              {field.options.map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          ) : (
            <input
              key={field.name}
              value={form[field.name]}
              onChange={e => setForm({ ...form, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              type={field.type}
              min={field.min}
              step={field.step}
              pattern={field.pattern}
              className="px-3 py-2 rounded bg-black/30 border border-white/10"
              required={field.required}
            />
          )
        ))}
        <button className="btn" type="submit">{editingId ? 'Salvar alteração' : 'Criar registro'}</button>
        {editingId && (
          <button className="btn" type="button" onClick={cancelEdit}>Cancelar</button>
        )}
      </form>

      {error && <p className="text-red-300 text-sm mb-3">{error}</p>}

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              {normalizedFields.map(f => <th key={f.name}>{f.label}</th>)}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                {normalizedFields.map(f => <td key={f.name}>{String(row[f.name] ?? '')}</td>)}
                <td className="flex gap-2">
                  <button className="btn" onClick={() => edit(row)} type="button">Editar</button>
                  <button className="btn" onClick={() => remove(row.id)} type="button">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
