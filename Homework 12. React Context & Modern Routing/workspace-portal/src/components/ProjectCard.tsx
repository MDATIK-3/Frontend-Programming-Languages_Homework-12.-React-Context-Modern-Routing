import { Link } from 'react-router-dom';
import type { Project, Priority, ProjectStatus } from '../api/fake-api';
import { useUiPreferences } from '../context/UiPreferencesContext';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<ProjectStatus, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  low: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { density } = useUiPreferences();
  const padding = density === 'compact' ? 'p-3' : 'p-4';

  return (
    <div className={`border border-green-200 dark:border-green-900 rounded-lg ${padding} bg-white dark:bg-gray-800 flex flex-col gap-2`}>
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/projects/${project.id}`}
          className="font-medium text-gray-900 dark:text-gray-100 hover:text-green-700 dark:hover:text-green-400"
        >
          {project.name}
          {project.pinned && (
            <span className="ml-2 text-xs text-yellow-500">📌</span>
          )}
        </Link>
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
        {project.description}
      </p>
      <div className="flex items-center justify-between mt-1">
        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[project.priority]}`}>
          {project.priority} priority
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{project.createdAt}</span>
      </div>
    </div>
  );
}
