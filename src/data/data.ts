import { data as home } from "./home";
import { data as error404 } from "./error404";

export interface PageMeta {
  title: string;
  /** Path starting with "/" or empty string */
  path: string;
  /** Page description */
  description: string;
  /** Open Graph image path */
  image: string;
}

export interface PageData {
  /** Page meta data for Open Graph etc */
  meta: PageMeta;
  /** Page content */
  content: { [key: string]: unknown };
  /** Arbitrary */
  [key: string]: unknown;
}

export interface AppData {
  /** App name */
  name: string;
  /** home url */
  homeUrl: string;
  /** Admin email */
  email: string;
  /** Meta data */
  meta: PageMeta;
}

export const meta: PageMeta = {
  path: "",
  description:
    "Unleash the power of code and technology to achieve your dreams!",
  image: `/img/og_img-1200x630.png`,
  title: "Let's do great things together!",
};

export function getData(homeUrl: string): any {
  return {
    app: {
      name: "Norman Lumilaan",
      homeUrl: homeUrl,
      email: "diiselkytus@gmail.com",
      meta,
    },
    home,
    error404,
  };
}
