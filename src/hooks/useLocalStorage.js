import { useState, useEffect } from "react";

/**
 * Hook CRUD com persistencia em localStorage.
 * Na primeira vez que a chave nao existe, carrega os dados
 * via fetch("/api/db.json") — igual ao padrao ensinado em aula.
 *
 * @param {string} key    - chave no localStorage (ex: "lobi:imoveis")
 */
export function useLocalStorage(key) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Carregamento inicial: localStorage ou fetch ao arquivo JSON
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
        setLoaded(true);
        return;
      } catch {
        // dado corrompido — cai no fetch abaixo
      }
    }

    // Primeira visita: busca dados do repositorio JSON
    const entityKey = key.split(":")[1]; // "lobi:imoveis" -> "imoveis"
    fetch("/api/db.json")
      .then((res) => res.json())
      .then((db) => {
        const seed = db[entityKey] ?? [];
        localStorage.setItem(key, JSON.stringify(seed));
        setItems(seed);
      })
      .catch((err) => {
        console.error("Erro ao carregar db.json:", err);
        setItems([]);
      })
      .finally(() => setLoaded(true));
  }, [key]);

  // Persiste no localStorage sempre que items muda (apos carregamento)
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(key, JSON.stringify(items));
    }
  }, [items, loaded, key]);

  function nextId() {
    if (items.length === 0) return 1;
    return Math.max(...items.map((i) => i.id ?? 0)) + 1;
  }

  function create(data) {
    setItems((prev) => [...prev, { ...data, id: nextId() }]);
  }

  function update(id, data) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }

  function remove(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return { items, create, update, remove };
}
