import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-redirects",
      closeBundle() {
        // Copy _redirects file after build
        try {
          copyFileSync("public/_redirects", "dist/_redirects");
          console.log("✅ _redirects file copied to dist/");
        } catch (err) {
          console.error("❌ Failed to copy _redirects:", err);
        }
      },
    },
  ],
});
