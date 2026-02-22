import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/dolly_site/", // Change if your repo name differs (e.g. "/" for username.github.io)
  build: {
    outDir: "docs",
  },
  server: {
    host: "0.0.0.0",
  },
});
