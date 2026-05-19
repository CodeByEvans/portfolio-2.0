import type { Project } from "../../data/projects";

export interface DesktopDockProps {
  onContinue: () => void;
  onOpenProject: (id: string) => void;
  onOpenPatterns: () => void;
}

export interface IPhoneScreenProps {
  onContinue: () => void;
}

export interface ProjectWindowProps {
  project: Project;
  onClose: () => void;
}
