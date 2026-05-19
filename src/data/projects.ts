export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  mediaType: "video" | "image";
  mediaSrc: string | string[];
  logoSrc: string;
  curiosity: string;
  github?: string;
  web?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "cathub",
    title: "Cathub",
    subtitle: "Widget de llamadas y notas",
    description:
      "App de llamadas con WebRTC. Enlazas la app con tu pareja y os podéis mandar notas y llamaros. Está destinada a ser usada como un widget, por lo que se puede usar en segundo plano, personalizar el diseño y más. Es un proyecto de aprendizaje, por lo que no es perfecto, pero me ha servido para aprender un montón sobre Tauri, Rust, WebRTC y más.",
    techStack: [
      "Tauri",
      "Rust",
      "React",
      "Node.js",
      "Supabase",
      "ZOD",
      "Motion",
      "Sonner",
      "Express",
    ],
    mediaType: "video",
    mediaSrc: "/Cathub.mp4",
    logoSrc: "/cathub - logo.svg",
    curiosity: "Los sonidos de llamadas y notificaciones los hice yo",
    github: "https://github.com/CodeByEvans/Cathub",
  },
  {
    id: "tualergiahoy",
    title: "tualergiahoy",
    subtitle: "IA + Salud",
    description:
      "Aplicación web con IA. Es una app de salud que te ayuda a llevar un control de tu alergia. Puedes registrar tus alergias, la medicación recetada y recibir recomendaciones geeneradas con IA basadas en predicciones meteorológicas. ",
    techStack: [
      "Python",
      "Django",
      "DRF",
      "Vue",
      "Gemini",
      "Open-Meteo",
      "Google APIs",
    ],
    mediaType: "video",
    mediaSrc: "/tualergiahoy.mp4",
    logoSrc: "/tualergiahoy.png",
    curiosity:
      "Backend Python + Django DRF · Frontend Vue · Automatización con Google Workspace",
    github: "https://github.com/CodeByEvans/tualergiahoy",
  },
  {
    id: "clover-studio",
    title: "Clover Studio",
    subtitle: "E-commerce",
    description:
      "E-commerce creado en Next.js optimizado para SEO. Full-stack con Cloudinary, Supabase y más. Dashboard privado en repositorio separado.",
    techStack: [
      "Next.js",
      "Cloudinary",
      "Supabase",
      "TypeScript",
      "TailwindCSS",
      "Axios",
      "jsPDF",
      "Sonner",
      "react-email",
    ],
    mediaType: "image",
    mediaSrc: ["/clover-studio.png"],
    logoSrc: "/clover studio - logo.svg",
    curiosity: "SEO optimizado · Dashboard privado en repo separado",
    github: "https://github.com/CodeByEvans/clover-studio",
    web: "https://cloverstudio.es",
  },
];
