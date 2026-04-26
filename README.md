# Lobi — Locação Imobiliária

Projeto SPA em React para a disciplina de Desenvolvimento Web 2 (SPODWE2), no domínio de **Locação de Imóveis**.

## Objetivo

Aplicação front-end para gerenciamento de entidades de negócio com CRUD completo, carregando conteúdo de um arquivo JSON local.

Entidades implementadas:

- `Imobiliária`
- `Imóvel`
- `Corretor`
- `Proposta`

## Requisitos atendidos

- ✅ React (SPA)
- ✅ Componentização da UI
- ✅ JSX
- ✅ Uso de `props` e `state`
- ✅ Rotas com `react-router-dom`
- ✅ Carregamento dinâmico a partir de `public/data.json`
- ✅ Tabelas com CRUD (criar, editar e excluir)
- ✅ Front-end apenas (sem backend e sem banco relacional)
- ✅ Loading com animação de marca: **Lobi → Locação imobiliária**

## Estrutura principal

- `src/App.jsx` — layout geral + rotas
- `src/components/Loading.jsx` — animação inicial
- `src/components/CrudTable.jsx` — tabela/formulário CRUD reutilizável
- `src/pages/Home.jsx` — visão geral
- `src/pages/Catalog.jsx` — catálogo de imóveis
- `src/pages/Dashboard.jsx` — painel de controle CRUD
- `src/utils/data.js` — leitura do JSON e download do JSON atualizado
- `public/data.json` — base de dados local

## Como executar

### 1) Instalar dependências

```powershell
npm install
```

### 2) Rodar ambiente de desenvolvimento

```powershell
npm run dev
```

### 3) Gerar build de produção

```powershell
npm run build
```

## Fluxo do “banco JSON”

- A aplicação carrega dados de `public/data.json` no início.
- O CRUD altera os dados em memória (state da aplicação).
- O botão **“Baixar JSON atualizado”** exporta um arquivo `data.updated.json` com o estado atual.
- O botão **“Recarregar JSON de origem”** recarrega do `public/data.json` (inclusive alterações feitas manualmente nesse arquivo durante a execução).

> Observação: como o projeto é apenas front-end, a escrita direta em `public/data.json` pelo navegador não é possível sem backend. O fluxo de exportar/importar JSON é a solução compatível com a restrição da disciplina.

## Checklist para entrega no Moodle

- [ ] Rodar `npm run build` sem erros
- [ ] Remover pasta `node_modules` antes de compactar
- [ ] Compactar em `.zip` ou `.rar`
- [ ] Nomear arquivo conforme regra da disciplina:
	- `ProjetoDWE2_NomeSobrenomeAluno1_NomeSobrenomeAluno2_NomeSobrenomeAluno3.zip`

