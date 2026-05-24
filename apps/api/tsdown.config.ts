import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  target: "node22",
  sourcemap: true,
  minify: true,
  dts: false,
  deps: {
    alwaysBundle: [/^@webapp-kitchen-sink\//],
  },
});
