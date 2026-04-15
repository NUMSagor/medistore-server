import { build } from "esbuild";

await build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  outfile: "dist/server.js",
  format: "esm",        // ESM output — better-auth খুশি
  packages: "external", // node_modules bundle করবে না
  sourcemap: true,
});

console.log("✅ Build complete");