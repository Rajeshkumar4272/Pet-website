
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Add this line
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
