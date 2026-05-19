import { defineConfig } from "@lovable.dev/vite-tanstack-config";
var stdin_default = defineConfig({
  tanstackStart: {
    server: { entry: "server" }
  }
});
export {
  stdin_default as default
};
