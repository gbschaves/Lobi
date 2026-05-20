import { CrudTable } from "@/components/CrudTable";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const COLUMNS = [
  { key: "imovel_titulo", label: "Imovel" },
  { key: "locatario_nome", label: "Locatario" },
  { key: "locatario_email", label: "E-mail" },
  { key: "valor_proposta", label: "Valor" },
  { key: "data", label: "Data" },
  { key: "status", label: "Status" },
];

const STATUS_OPTS = ["Pendente", "Aprovada", "Recusada", "Em analise"].map((s) => ({ value: s, label: s }));

const FIELDS = [
  { key: "imovel_titulo", label: "Imovel", required: true },
  { key: "locatario_nome", label: "Nome do Locatario", required: true },
  { key: "locatario_email", label: "E-mail do Locatario", type: "email", required: true },
  { key: "locatario_telefone", label: "Telefone do Locatario", required: true },
  { key: "valor_proposta", label: "Valor da Proposta", required: true },
  { key: "data", label: "Data", type: "date", required: true },
  { key: "status", label: "Status", type: "select", required: true, options: STATUS_OPTS },
];

const EMPTY = {
  imovel_titulo: "", locatario_nome: "", locatario_email: "",
  locatario_telefone: "", valor_proposta: "", data: "", status: "Pendente"
};

export default function PropostasPage() {
  const { items, create, update, remove } = useLocalStorage("lobi:propostas");
  return (
    <CrudTable
      title="Propostas"
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
