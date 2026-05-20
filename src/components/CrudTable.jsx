import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, X, ChevronLeft, Loader2, MapPin } from "lucide-react";

// Busca ViaCEP e retorna os dados ou null
async function fetchViaCep(cep) {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return data;
  } catch {
    return null;
  }
}

// Formata o endereco completo a partir dos dados do ViaCEP
function buildFullAddress(data) {
  const parts = [];
  if (data.logradouro) parts.push(data.logradouro);
  if (data.bairro) parts.push(data.bairro);
  if (data.localidade && data.uf) parts.push(`${data.localidade}/${data.uf}`);
  else if (data.localidade) parts.push(data.localidade);
  return parts.join(", ");
}

// Aplica mascara de CEP: XXXXX-XXX
function maskCep(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
}

// Componente de campo CEP com auto-preenchimento
function CepField({ fieldDef, value, onChange, onFills, disabled }) {
  const [loading, setLoading] = useState(false);
  const [error, setCepError] = useState("");

  async function handleBlur() {
    const digits = value.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setLoading(true);
    setCepError("");
    const data = await fetchViaCep(digits);
    setLoading(false);
    if (!data) {
      setCepError("CEP nao encontrado.");
      return;
    }
    // aplica fills
    if (fieldDef.fills) {
      const patch = {};
      for (const [formKey, viaCepKey] of Object.entries(fieldDef.fills)) {
        if (viaCepKey === "__full__") {
          patch[formKey] = buildFullAddress(data);
        } else if (viaCepKey === "__bairro_cidade__") {
          patch[formKey] = [data.bairro, data.localidade, data.uf].filter(Boolean).join(", ");
        } else {
          patch[formKey] = data[viaCepKey] ?? "";
        }
      }
      onFills(patch);
    }
  }

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          placeholder="00000-000"
          className="w-full border border-border rounded-sm bg-card px-3 py-2 text-sm outline-none focus:border-[var(--olive)] transition pr-10"
          value={value}
          required={fieldDef.required}
          disabled={disabled}
          onChange={(e) => onChange(maskCep(e.target.value))}
          onBlur={handleBlur}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-[var(--olive)]" />
          ) : (
            <MapPin className="h-4 w-4 opacity-40" />
          )}
        </span>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function CrudTable({ title, backTo, columns, items, fields, emptyItem, onCreate, onUpdate, onDelete, formatCell }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  function openCreate() { setForm({ ...emptyItem }); setModal({ mode: "create" }); }
  function openEdit(item) { setForm({ ...item }); setModal({ mode: "edit", id: item.id }); }
  function closeModal() { setModal(null); }

  function handleSubmit(e) {
    e.preventDefault();
    if (modal.mode === "create") onCreate(form); else onUpdate(modal.id, form);
    closeModal();
  }

  function handleDelete(id) { onDelete(id); setDeleteConfirm(null); }

  // Aplica multiplos campos de uma vez (usado pelo CepField)
  function applyFills(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  const filtered = items.filter((item) =>
    columns.some((col) => String(item[col.key] ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-[var(--olive-deep)] text-cream shadow-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={backTo || "/"} className="flex items-center gap-1 text-cream/70 hover:text-[var(--gold)] transition text-sm">
              <ChevronLeft className="h-4 w-4" />Inicio
            </Link>
            <span className="text-cream/30">/</span>
            <h1 className="font-display text-xl text-cream">{title}</h1>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full border border-[var(--gold)] flex items-center justify-center">
              <span className="font-display text-[var(--gold)] text-base">L</span>
            </span>
            <span className="font-display text-lg text-cream tracking-wide">LoBi</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <input
            className="border border-border rounded-sm bg-card px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-[var(--olive)] transition w-full sm:w-80"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[var(--olive)] text-primary-foreground px-5 py-2.5 rounded-sm hover:bg-[var(--olive-deep)] transition text-sm font-medium whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />Novo registro
          </button>
        </div>
        <div className="overflow-x-auto rounded-sm border border-border shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-[var(--olive-deep)] text-cream">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-5 py-3.5 font-medium tracking-wide text-xs uppercase whitespace-nowrap">{col.label}</th>
                ))}
                <th className="px-5 py-3.5 text-right text-xs uppercase tracking-wide font-medium">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={columns.length + 1} className="text-center py-12 text-muted-foreground">Nenhum registro encontrado.</td></tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? "bg-card" : "bg-background"}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3.5 align-middle">
                        {formatCell ? (formatCell(col.key, item) ?? item[col.key]) : item[col.key]}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-[var(--olive)]/20 text-[var(--olive)] transition"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded hover:bg-red-100 text-red-500 transition"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">{filtered.length} registro{filtered.length !== 1 ? "s" : ""}</p>
      </main>

      {/* Modal Create / Edit */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-sm shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-display text-xl">{modal.mode === "create" ? "Novo registro" : "Editar registro"}</h2>
              <button onClick={closeModal} className="p-1 rounded hover:bg-muted transition text-muted-foreground"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium mb-1.5">
                    {f.label}
                    {f.required && <span className="text-red-500 ml-1">*</span>}
                    {f.type === "cep" && (
                      <span className="text-muted-foreground text-xs font-normal ml-2">— preenche o endereco automaticamente</span>
                    )}
                  </label>
                  {f.type === "cep" ? (
                    <CepField
                      fieldDef={f}
                      value={form[f.key] ?? ""}
                      onChange={(v) => setForm((p) => ({ ...p, [f.key]: v }))}
                      onFills={applyFills}
                    />
                  ) : f.type === "select" ? (
                    <select
                      className="w-full border border-border rounded-sm bg-card px-3 py-2 text-sm outline-none focus:border-[var(--olive)] transition"
                      value={form[f.key] ?? ""}
                      required={f.required}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    >
                      <option value="">Selecione...</option>
                      {f.options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                    </select>
                  ) : (
                    <input
                      type={f.type || "text"}
                      className="w-full border border-border rounded-sm bg-card px-3 py-2 text-sm outline-none focus:border-[var(--olive)] transition"
                      value={form[f.key] ?? ""}
                      required={f.required}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="px-5 py-2 rounded-sm border border-border text-sm hover:bg-muted transition">Cancelar</button>
                <button type="submit" className="px-5 py-2 rounded-sm bg-[var(--olive)] text-primary-foreground text-sm font-medium hover:bg-[var(--olive-deep)] transition">
                  {modal.mode === "create" ? "Criar" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-sm shadow-xl w-full max-w-sm p-6 text-center">
            <h2 className="font-display text-xl mb-2">Confirmar exclusao</h2>
            <p className="text-muted-foreground text-sm mb-6">Tem certeza que deseja excluir este registro? Esta acao nao pode ser desfeita.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2 rounded-sm border border-border text-sm hover:bg-muted transition">Cancelar</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-5 py-2 rounded-sm bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
