/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// The staging deploy publishes to liberata.info/staging/, production to the
// root. The workflows communicate this through PUBLIC_URL (kept from the CRA
// setup so the deploy workflows keep working); Vite wants just the path, with
// a trailing slash.
function basePath(): string {
  const raw = process.env.PUBLIC_URL;
  if (!raw) return "/";
  let path: string;
  try {
    path = new URL(raw).pathname;
  } catch {
    path = raw;
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return path.endsWith("/") ? path : `${path}/`;
}

export default defineConfig({
  base: basePath(),
  plugins: [react()],
  server: { port: 3000, open: false },
  build: {
    // gh-pages and the deploy script both expect build/, not Vite's dist/
    outDir: "build",
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: false,
  },
});
