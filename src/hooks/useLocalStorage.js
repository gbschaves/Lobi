import { useState } from "react";

/**
 * Hook CRUD que persiste dados no localStorage.
 * @param {string} key - chave única no localStorage
 * @param {Array} initialData - dados iniciais (seed)
 */
export function useLocalStorage(key, initialData = []) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialData;
    } catch {
      return initialData;
    }
  });

  function save(next) {
    setItems(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      console.error("localStorage error", e);
    }
  }

  function create(item) {
    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const next = [...items, { ...item, id: nextId }];
    save(next);
    return nextId;
  }

  function update(id, data) {
    const next = items.map((i) => (i.id === id ? { ...i, ...data } : i));
    save(next);
  }

  function remove(id) {
    save(items.filter((i) => i.id !== id));
  }

  return { items, create, update, remove };
}
