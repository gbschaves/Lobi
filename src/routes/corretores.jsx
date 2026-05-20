import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/CrudTable";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dbSeed from "@/data/db.json";

export const Route = createFileRoute("/corretores")({
  component: CorretoresPage,
});

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

function CorretoresPage() {
  const { items, create, update, remove } = useLocalStorage("lobi:corretores", dbSeed.corretores);
  return (
    <CrudTable
      title="Corretores"
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
