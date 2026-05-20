import { CrudTable } from "@/components/CrudTable";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  { key: "cep", label: "CEP", type: "cep", fills: { endereco: "__full__" } },
  { key: "endereco", label: "Endereco", required: true },
  { key: "telefone", label: "Telefone", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
  { key: "website", label: "Website" },
];

const EMPTY = { nome: "", cnpj: "", cep: "", endereco: "", telefone: "", email: "", website: "" };

export default function ImobiliariasPage() {
  const { items, create, update, remove } = useLocalStorage("lobi:imobiliarias");
  return (
    <CrudTable
      title="Imobiliarias"
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
