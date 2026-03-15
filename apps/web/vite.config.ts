import path from "node:path";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDevelopment = env.NODE_ENV === "development";

  const plugins = [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    svgr(),
  ];

  if (process.env.ANALYZE === "true") {
    plugins.push(visualizer({ open: true }));
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      allowedHosts: isDevelopment ? true : undefined,
      port: Number(env.PORT || "3001"),
    },
  };
});
