import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/CrudTable";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dbSeed from "@/data/db.json";

export const Route = createFileRoute("/imoveis")({
  component: ImoveisPage,
});

const COLUMNS = [
  { key: "titulo", label: "Titulo" },
  { key: "tipo", label: "Tipo" },
  { key: "endereco", label: "Endereco" },
  { key: "preco", label: "Preco" },
  { key: "area", label: "Area" },
  { key: "status", label: "Status" },
  { key: "imobiliaria_nome", label: "Imobiliaria" },
];

const STATUS_OPTS = ["Disponivel", "Alugado", "Vendido", "Reservado"].map((s) => ({ value: s, label: s }));
const TIPO_OPTS = ["Casa", "Apartamento", "Cobertura", "Comercial", "Rural", "Terreno"].map((s) => ({ value: s, label: s }));

const FIELDS = [
  { key: "titulo", label: "Titulo", required: true },
  { key: "tipo", label: "Tipo", type: "select", required: true, options: TIPO_OPTS },
  { key: "cep", label: "CEP", type: "cep", fills: { endereco: "__full__" } },
  { key: "endereco", label: "Endereço", required: true },
  { key: "preco", label: "Preco", required: true },
  { key: "quartos", label: "Quartos", type: "number" },
  { key: "banheiros", label: "Banheiros", type: "number" },
  { key: "area", label: "Area (m2)" },
  { key: "status", label: "Status", type: "select", required: true, options: STATUS_OPTS },
  { key: "imobiliaria_nome", label: "Imobiliaria", required: true },
];

const EMPTY = { titulo: "", tipo: "", cep: "", endereco: "", preco: "", quartos: "", banheiros: "", area: "", status: "Disponivel", imobiliaria_nome: "" };

function ImoveisPage() {
  const { items, create, update, remove } = useLocalStorage("lobi:imoveis", dbSeed.imoveis);
  return (
    <CrudTable
      title="Imoveis"
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
