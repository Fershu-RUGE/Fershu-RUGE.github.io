export interface Skill {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  tier: number;
}

export interface Player {
  id: number;
  name: string;
  skills: Skill[];
}
