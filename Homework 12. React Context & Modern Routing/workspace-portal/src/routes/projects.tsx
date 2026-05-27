/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, redirect } from 'react-router-dom';
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom';
import { getProjects, createProject } from '../api/fake-api';
import type { Project, Priority } from '../api/fake-api';
import ProjectCard from '../components/ProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import CreateProjectForm from '../components/CreateProjectForm';
import { useState } from 'react';

export interface ProjectsLoaderData {
  projects: Project[];
  q: string;
  status: string;
}

export interface ProjectsActionData {
  error?: string;
}

export async function projectsLoader({ request }: LoaderFunctionArgs): Promise<ProjectsLoaderData> {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') ?? '';
  const status = url.searchParams.get('status') ?? 'all';
  const projects = await getProjects(q, status);
  return { projects, q, status };
}

export async function projectsAction({ request }: ActionFunctionArgs): Promise<Response | ProjectsActionData> {
  const formData = await request.formData();
  const intent = String(formData.get('intent') ?? '');

  if (intent === 'create') {
    const name = String(formData.get('name') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const priority = String(formData.get('priority') ?? 'medium') as Priority;

    if (!name) return { error: 'Project name is required.' };

    await createProject(name, description, priority);
    return redirect('/projects');
  }

  return { error: 'Unknown action.' };
}

export default function Projects() {
  const { projects, q, status } = useLoaderData() as ProjectsLoaderData;
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded font-medium"
        >
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && <CreateProjectForm />}

      <ProjectFilters />

      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
          {q && ` matching "${q}"`}
          {status !== 'all' && ` with status "${status}"`}
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No projects found.</p>
          {(q || status !== 'all') && (
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
