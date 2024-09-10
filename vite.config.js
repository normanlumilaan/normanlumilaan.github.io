import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import { ViteEjsPlugin } from "vite-plugin-ejs";
//import { fileURLToPath } from "node:url";

//const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_APP_PORT, 10) || undefined;

  // Home url with port number
  if (port) {
    process.env.VITE_APP_HOME_URL = `${env.VITE_APP_HOME_URL}:${port}`;
  }

  const data = {
    app: {
      name: "Norman Lumilaan",
      homeUrl: env.VITE_APP_HOME_URL,
      email: "diiselkytus@gmail.com",
      title: "Let's work together! - Norman Lumilaan",
      description:
        "Unleash the power of code and technology to achieve your dreams!",
      image: `${env.VITE_APP_HOME_URL}/img/og_img-1200x630.png`,
    },
    home: {
      title: "Home - Norman Lumilaan",
    },
  };

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
      ViteEjsPlugin(data),
    ],
  };
});
