import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_APP_PORT, 10) || undefined;

  // Home url with port number
  if (port) {
    process.env.VITE_APP_HOME_URL = `${env.VITE_APP_HOME_URL}:${port}`;
  }

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
  };
});
