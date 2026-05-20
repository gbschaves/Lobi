import { CrudTable } from "@/components/CrudTable";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const COLUMNS = [
  { key: "nome", label: "Nome" },
  { key: "creci", label: "CRECI" },
  { key: "telefone", label: "Telefone" },
  { key: "email", label: "E-mail" },
  { key: "imobiliaria_nome", label: "Imobiliaria" },
];

const FIELDS = [
  { key: "nome", label: "Nome", required: true },
  { key: "creci", label: "CRECI", required: true },
  { key: "telefone", label: "Telefone", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
  { key: "imobiliaria_nome", label: "Imobiliaria", required: true },
];

const EMPTY = { nome: "", creci: "", telefone: "", email: "", imobiliaria_nome: "" };

export default function CorretoresPage() {
  const { items, create, update, remove } = useLocalStorage("lobi:corretores");
  return (
    <CrudTable
      title="Corretores"
      backTo="/"
      columns={COLUMNS}
      items={items}
      fields={FIELDS}
      emptyItem={EMPTY}
      onCreate={create}
      onUpdate={update}
      onDelete={remove}
    />
  );
}
