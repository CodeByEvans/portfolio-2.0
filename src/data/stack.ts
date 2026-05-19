import type { IconType } from "react-icons";
import {
  HiPaintBrush,
  HiCog6Tooth,
  HiCloud,
  HiCircleStack,
} from "react-icons/hi2";
import {
  SiReact,
  SiVuedotjs,
  SiTailwindcss,
  SiNextdotjs,
  SiZod,
  SiNodedotjs,
  SiDjango,
  SiSpring,
  SiNestjs,
  SiCloudinary,
  SiDocker,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
} from "react-icons/si";
import { PiTestTubeFill, PiDatabaseFill, PiCloudFill } from "react-icons/pi";

export interface Technology {
  name: string;
  icon: IconType;
}

export interface Category {
  id: string;
  label: string;
  icon: IconType;
  description: string;
  technologies: Technology[];
}

export interface Language {
  id: string;
  label: string;
  icon: IconType;
  extension: string;
  filename: string;
  code: string;
  command: string;
  output: string;
}

export const LANGUAGES: Language[] = [
  {
    id: "typescript",
    label: "TypeScript",
    icon: SiTypescript,
    extension: ".tsx",
    filename: "App.tsx",
    code: `import { createRoot } from "react-dom/client";
import { Stack } from "@/components/Stack";

const root = createRoot(
  document.getElementById("root")!
);

root.render(<Stack />);`,
    command: "npm run dev",
    output: `> portfolio@1.0.0 dev
> vite

  VITE v6.0.0  ready in 247 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    icon: SiJavascript,
    extension: ".jsx",
    filename: "App.jsx",
    code: `import { createRoot } from "react-dom/client";
import { Stack } from "./components/Stack";

const root = createRoot(
  document.getElementById("root")
);

root.render(<Stack />);`,
    command: "npm run dev",
    output: `> portfolio@1.0.0 dev
> vite

  VITE v6.0.0  ready in 189 ms

  ➜  Local:   http://localhost:5173/`,
  },
  {
    id: "python",
    label: "Python",
    icon: SiPython,
    extension: ".py",
    filename: "views.py",
    code: `from django.shortcuts import render
from .services import get_categories


def stack_view(request):
    """Render the interactive tech stack."""
    categories = get_categories()
    return render(request, "stack.html", {
        "categories": categories
    })`,
    command: "python manage.py runserver",
    output: `Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

Django version 5.1, using settings 'config.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.`,
  },
  {
    id: "java",
    label: "Java",
    icon: SiOpenjdk,
    extension: ".java",
    filename: "StackController.java",
    code: `@Controller
@RequestMapping("/stack")
public class StackController {

    private final StackService stackService;

    public StackController(StackService stackService) {
        this.stackService = stackService;
    }

    @GetMapping
    public String showStack(Model model) {
        model.addAttribute(
            "technologies",
            stackService.getAll()
        );
        return "stack";
    }
}`,
    command: "./mvnw spring-boot:run",
    output: `  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.4.0)

Started Application in 3.421 seconds`,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: HiPaintBrush,
    description: "Interfaces & UX",
    technologies: [
      { name: "React", icon: SiReact },
      { name: "Vue", icon: SiVuedotjs },
      { name: "TailwindCSS", icon: SiTailwindcss },
      { name: "Playwright", icon: PiTestTubeFill },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Zod", icon: SiZod },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: HiCog6Tooth,
    description: "Servers & APIs",
    technologies: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Django", icon: SiDjango },
      { name: "Spring", icon: SiSpring },
      { name: "Nest.js", icon: SiNestjs },
    ],
  },
  {
    id: "cloud",
    label: "Cloud + Tools",
    icon: HiCloud,
    description: "Cloud & DevOps",
    technologies: [
      { name: "Oracle", icon: PiDatabaseFill },
      { name: "AWS", icon: PiCloudFill },
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "Git", icon: SiGit },
      { name: "Docker", icon: SiDocker },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: HiCircleStack,
    description: "Data & Storage",
    technologies: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
];
