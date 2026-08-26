import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  // chevrotain 13+ ships ESM-only; bundle it into our own CJS/ESM output
  // instead of leaving it as an external require().
  noExternal: ["chevrotain"],
});
