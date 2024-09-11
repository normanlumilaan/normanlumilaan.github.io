import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { getData } from "./src/data/data";

//import { fileURLToPath } from "node:url";
//const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_APP_PORT, 10) || undefined;
  const url = env.VITE_APP_HOME_URL;
  const homeUrl = mode === "development" ? `${url}:${port}` : url;

  return {
    base: "/",
    server: {
      port: port,
      host: "0.0.0.0",
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          page404: path.resolve(__dirname, "404.html"),
        },
      },
    },
    plugins: [
      // With Data
      ViteEjsPlugin(getData(homeUrl)),
    ],
  };
});
