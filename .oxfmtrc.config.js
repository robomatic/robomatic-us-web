import { defineConfig } from "oxfmt";

export default defineConfig({
  $schema: "./node_modules/oxfmt/configuration_schema.json",
  ignorePatterns: ["**/*.mdx"],
  printWidth: 80,
  semi: false,
  sortImports: true,
  sortTailwindcss: true,
  sortPackageJson: true,
});
