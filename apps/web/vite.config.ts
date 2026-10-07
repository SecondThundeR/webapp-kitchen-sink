import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDevelopment = mode === "development";

  return {
    plugins: [react({ compiler: true }), tailwindcss(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      allowedHosts: isDevelopment ? true : undefined,
      port: Number(env.PORT || "3001"),
    },
    build: {
      rollupOptions: {
        onLog(level, log, defaultHandler) {
          if (log.code === "EVAL" && log.id?.includes("node_modules")) return;
          defaultHandler(level, log);
        },
      },
    },
  };
});
