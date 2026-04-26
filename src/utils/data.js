export async function fetchData(force = false) {
  const suffix = force ? `?t=${Date.now()}` : ''
  const res = await fetch(`/data.json${suffix}`)
  if (!res.ok) throw new Error('Falha ao carregar data.json')
  return res.json()
}

export function validateDataShape(data) {
  const requiredKeys = ['imobiliarias', 'imoveis', 'corretores', 'propostas']
  if (!data || typeof data !== 'object') return false
  return requiredKeys.every(key => Array.isArray(data[key]))
}

export function downloadData(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.updated.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}'))
        resolve(parsed)
      } catch (error) {
        reject(new Error('Arquivo JSON inválido.'))
      }
    }
    reader.onerror = () => reject(new Error('Falha ao ler arquivo.'))
    reader.readAsText(file, 'utf-8')
  })
}
