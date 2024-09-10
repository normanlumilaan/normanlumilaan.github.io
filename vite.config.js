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
      description:
        "Unleash the power of code and technology to achieve your dreams!",
      image: `${env.VITE_APP_HOME_URL}/img/og_img-1200x630.png`,
      title: "Let's do great things together!",
    },
    home: {
      path: "",
      intro: {
        title: "Norman Lumilaan",
        body: "",
      },
      info: {
        title: "Info",
        body: "If you're ready to take your business to new heights, I'd love the opportunity to connect and explore how we can work together. Let's unleash the power of code and technology to achieve your dreams!",
      },
      services: {
        title: "Services",
        body: [
          "TypeScript",
          "Node.js",
          "SCSS",
          "Python",
          "SQL",
          "PHP",
          "React",
        ],
      },
      contacts: {
        title: "Contacts",
        body: [
          { label: "Email", url: "diiselkytus@gmail.com" },
          {
            label: "GitHub",
            url: "https://www.linkedin.com/in/norman-lumilaan/",
          },
          { label: "LinkedIn", url: "https://github.com/normanlumilaan" },
        ],
      },
    },
    error404: {
      title: "404 Not Found",
      path: "/404.html",
      body: "Sometimes things don’t go as planned, and that’s perfectly fine. Take a deep breath. We’re here to guide you back.",
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
