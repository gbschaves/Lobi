import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/CrudTable";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dbSeed from "@/data/db.json";

export const Route = createFileRoute("/imobiliarias")({
  component: ImobiliariasPage,
});

const COLUMNS = [
  { key: "nome", label: "Nome" },
  { key: "cnpj", label: "CNPJ" },
  { key: "endereco", label: "Endereco" },
  { key: "telefone", label: "Telefone" },
  { key: "email", label: "E-mail" },
];

const FIELDS = [
  { key: "nome", label: "Nome", required: true },
  { key: "cnpj", label: "CNPJ", required: true },
  { key: "endereco", label: "Endereco", required: true },
  { key: "telefone", label: "Telefone", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
  { key: "website", label: "Website" },
];

const EMPTY = { nome: "", cnpj: "", endereco: "", telefone: "", email: "", website: "" };

function ImobiliariasPage() {
  const { items, create, update, remove } = useLocalStorage("lobi:imobiliarias", dbSeed.imobiliarias);
  return (
    <CrudTable
      title="Imobiliarias"
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
