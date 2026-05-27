export type ProjectStatus = 'active' | 'completed' | 'archived';
export type Priority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  pinned: boolean;
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
}

export interface WorkspaceSummary {
  name: string;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

let projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign the main website with updated branding and layout.',
    status: 'active',
    priority: 'high',
    pinned: true,
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Mobile App MVP',
    description: 'Build the first version of the mobile application.',
    status: 'active',
    priority: 'high',
    pinned: false,
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate third-party payment and shipping APIs.',
    status: 'completed',
    priority: 'medium',
    pinned: false,
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Analytics Dashboard',
    description: 'Internal analytics dashboard for business metrics.',
    status: 'active',
    priority: 'medium',
    pinned: false,
    createdAt: '2024-02-01',
  },
  {
    id: '5',
    name: 'Legacy Cleanup',
    description: 'Remove deprecated code from the legacy system.',
    status: 'archived',
    priority: 'low',
    pinned: false,
    createdAt: '2024-02-05',
  },
  {
    id: '6',
    name: 'Documentation',
    description: 'Write comprehensive API and developer documentation.',
    status: 'completed',
    priority: 'low',
    pinned: false,
    createdAt: '2024-02-10',
  },
];

const user: User = { name: 'Md Atik', email: 'atik@workspace.dev' };

export async function getCurrentUser(): Promise<User> {
  await delay(50);
  return { ...user };
}

export async function getWorkspaceSummary(): Promise<WorkspaceSummary> {
  await delay(100);
  return {
    name: 'Workspace Portal',
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === 'active').length,
    completedProjects: projects.filter((p) => p.status === 'completed').length,
  };
}

export async function getProjects(q: string, status: string): Promise<Project[]> {
  await delay(150);
  return projects
    .filter((p) => {
      const qLower = q.toLowerCase();
      const matchesQ =
        !qLower ||
        p.name.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower);
      const matchesStatus = status === 'all' || p.status === status;
      return matchesQ && matchesStatus;
    })
    .map((p) => ({ ...p }));
}

export async function getProjectById(id: string): Promise<Project> {
  await delay(100);
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Response(`Project "${id}" not found`, { status: 404 });
  return { ...project };
}

export async function createProject(
  name: string,
  description: string,
  priority: Priority,
): Promise<Project> {
  await delay(200);
  const newProject: Project = {
    id: String(Date.now()),
    name,
    description,
    status: 'active',
    priority,
    pinned: false,
    createdAt: new Date().toISOString().split('T')[0],
  };
  projects = [...projects, newProject];
  return { ...newProject };
}

export async function togglePin(id: string): Promise<Project> {
  await delay(100);
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Response(`Project "${id}" not found`, { status: 404 });
  project.pinned = !project.pinned;
  return { ...project };
}

export async function toggleCompleted(id: string): Promise<Project> {
  await delay(100);
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Response(`Project "${id}" not found`, { status: 404 });
  project.status = project.status === 'completed' ? 'active' : 'completed';
  return { ...project };
}

export async function toggleArchive(id: string): Promise<Project> {
  await delay(100);
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Response(`Project "${id}" not found`, { status: 404 });
  project.status = project.status === 'archived' ? 'active' : 'archived';
  return { ...project };
}
