import { Route as rootRouteImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as ImobiliariasRouteImport } from "./routes/imobiliarias";
import { Route as CorretoresRouteImport } from "./routes/corretores";
import { Route as ImoveisRouteImport } from "./routes/imoveis";
import { Route as PropostasRouteImport } from "./routes/propostas";

const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport
});
const ImobiliariasRoute = ImobiliariasRouteImport.update({
  id: "/imobiliarias",
  path: "/imobiliarias",
  getParentRoute: () => rootRouteImport
});
const CorretoresRoute = CorretoresRouteImport.update({
  id: "/corretores",
  path: "/corretores",
  getParentRoute: () => rootRouteImport
});
const ImoveisRoute = ImoveisRouteImport.update({
  id: "/imoveis",
  path: "/imoveis",
  getParentRoute: () => rootRouteImport
});
const PropostasRoute = PropostasRouteImport.update({
  id: "/propostas",
  path: "/propostas",
  getParentRoute: () => rootRouteImport
});

const rootRouteChildren = {
  IndexRoute,
  ImobiliariasRoute,
  CorretoresRoute,
  ImoveisRoute,
  PropostasRoute,
};
const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes();
export {
  routeTree
};
