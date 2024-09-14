import { data as home } from "./pages/home";
import { data as error404 } from "./pages/error404";

interface PageMeta {
  /** Page title */
  title: string;
  /** Page short description */
  description: string;
  /** Page image for e.g. open graph. Relative url to app home url. */
  image: string;
  /** Page path */
  path: string;
}

export interface PageData {
  meta: PageMeta;
  content: object | unknown[];
}

export interface AppData {
  name: string;
  homeUrl: string;
  email: string;
  tagline: string;
}

export interface TemplateData {
  app: AppData;
  [key: string]: PageData | AppData;
}

export function getData(homeUrl: string): TemplateData {
  const app: AppData = {
    name: "Norman Lumilaan",
    homeUrl: homeUrl,
    email: "diiselkytus@gmail.com",
    tagline: "Let's make great things together!",
  };

  /**
   * The original idea was to create template data object by merging global app data
   * and requested page data (e.g. home) objects and then passing it to template rendering,
   * nothing unheard right? Since current implementation of vite-plugin-ejs
   * takes whole data object at once (thus making all data available to templates at
   * all times no isolation ☹️ ) there is no point to duplicate app object in each page.
   */
  return {
    app,
    home,
    error404,
  };
}
