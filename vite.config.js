import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/dolly_site/", // Use VITE_BASE_URL=/ for custom domain
  build: {
    outDir: "docs",
  },
  server: {
    host: "0.0.0.0",
  },
});
