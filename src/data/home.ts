import { PageData } from "./data";

export const data: PageData = {
  meta: {
    title: "Let's make great things together!",
    path: "",
    description:
      "Unleash the power of code and technology to achieve your dreams!",
    image: "/img/og_img-1200x630.png",
  },
  content: {
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
      body: ["TypeScript", "Node.js", "SCSS", "Python", "SQL", "PHP", "React"],
    },
    contacts: {
      title: "Contacts",
      body: [
        { label: "Email", url: "diiselkytus@gmail.com" },
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/norman-lumilaan/",
        },
        { label: "GitHub", url: "https://github.com/normanlumilaan" },
      ],
    },
  },
};
