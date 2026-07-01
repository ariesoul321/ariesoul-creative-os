import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/ariesoul-creative-os/",
  server: { port: 5173 },
});
