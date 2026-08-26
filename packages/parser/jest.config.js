const path = require("path");

// chevrotain's @chevrotain/* subpackages only declare an "import" condition in
// their package.json "exports" map (no "require"), so Node's/Jest's default
// CJS resolver can't find them via a bare specifier. Resolve their concrete
// ESM entry files directly so ts-jest can still transform them to CJS below.
const nodeModulesDir = path.resolve(
  path.dirname(require.resolve("chevrotain")),
  "../../.."
);
const chevrotainSubpackage = (name) =>
  path.join(nodeModulesDir, "@chevrotain", name, "lib/src/api.js");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // chevrotain 13+ (and its @chevrotain/* subpackages) ship ESM-only; let
  // ts-jest transpile them to CJS for tests rather than leaving them external.
  transformIgnorePatterns: ["/node_modules/(?!(chevrotain|@chevrotain)/)"],
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@chevrotain/utils$": chevrotainSubpackage("utils"),
    "^@chevrotain/gast$": chevrotainSubpackage("gast"),
    "^@chevrotain/regexp-to-ast$": chevrotainSubpackage("regexp-to-ast"),
    "^@chevrotain/cst-dts-gen$": chevrotainSubpackage("cst-dts-gen"),
  },
};
