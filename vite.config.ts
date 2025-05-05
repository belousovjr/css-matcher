import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CSSMatcher",
      fileName: "css-matcher",
      formats: ["es", "cjs", "umd"],
    },
  },
  plugins: [dts()],
});
