import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: false,
      },
    },
  },
});
