import { execSync } from "node:child_process";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDevelopment = env.NODE_ENV === "development";

  let commitHash = "";

  try {
    if (process.env.RAILWAY_GIT_COMMIT_SHA) {
      commitHash = process.env.RAILWAY_GIT_COMMIT_SHA.substring(0, 7);
    } else {
      commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    }
  } catch {
    commitHash = "unknown";
  }

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tailwindcss(),
      svgr(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "import.meta.env.VITE_GIT_SHA": JSON.stringify(commitHash),
    },
    server: {
      allowedHosts: isDevelopment ? true : undefined,
      port: Number(env.PORT || "3001"),
    },
  };
});
