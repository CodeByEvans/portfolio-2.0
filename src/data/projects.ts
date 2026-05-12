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
}

export const PROJECTS: Project[] = [
  {
    id: "cathub",
    title: "Cathub",
    subtitle: "Conexión Peer-to-Peer",
    description:
      "App de llamadas peer-to-peer. Enlazas la app con tu pareja y os podéis mandar notas y llamaros. Además de ver la hora como un pro. Totalmente personalizable.",
    techStack: ["Tauri", "Rust", "React", "Supabase", "ZOD", "SOLID", "Motion"],
    mediaType: "video",
    mediaSrc: "/Cathub.mp4",
    logoSrc: "/cathub - logo.svg",
    curiosity: "Los sonidos de llamadas y notificaciones los hice yo",
  },
  {
    id: "tualergiahoy",
    title: "tualergiahoy",
    subtitle: "IA + Salud",
    description:
      "App web con IA. open-meteo observa el clima, contacta con Gemini y genera un informe personalizado según tus alergias, con recomendaciones. Registra en Google Sheets, usa una plantilla de Google Docs y envía el informe por mail.",
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
    ],
    mediaType: "image",
    mediaSrc: ["/clover-studio.png", "/clover studio - logo.svg"],
    logoSrc: "/clover studio - logo.svg",
    curiosity: "SEO optimizado · Dashboard privado en repo separado",
  },
];
