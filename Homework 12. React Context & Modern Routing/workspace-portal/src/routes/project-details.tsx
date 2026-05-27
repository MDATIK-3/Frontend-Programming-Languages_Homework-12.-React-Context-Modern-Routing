/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useFetcher, Link } from 'react-router-dom';
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom';
import { getProjectById, togglePin, toggleCompleted, toggleArchive } from '../api/fake-api';
import type { Project, Priority, ProjectStatus } from '../api/fake-api';

export interface ProjectDetailsLoaderData {
  project: Project;
}

export async function projectDetailsLoader({
  params,
}: LoaderFunctionArgs): Promise<ProjectDetailsLoaderData> {
  const id = params.projectId;
  if (!id) throw new Response('Project ID is required', { status: 400 });
  const project = await getProjectById(id);
  return { project };
}

export async function projectDetailsAction({
  request,
  params,
}: ActionFunctionArgs): Promise<null> {
  const id = params.projectId;
  if (!id) throw new Response('Project ID is required', { status: 400 });

  const formData = await request.formData();
  const intent = String(formData.get('intent') ?? '');

  if (intent === 'toggle-pin') {
    await togglePin(id);
  } else if (intent === 'toggle-completed') {
    await toggleCompleted(id);
  } else if (intent === 'toggle-archive') {
    await toggleArchive(id);
  }

  return null;
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

export default function ProjectDetails() {
  const { project } = useLoaderData() as ProjectDetailsLoaderData;

  const pinFetcher = useFetcher<null>();
  const completedFetcher = useFetcher<null>();
  const archiveFetcher = useFetcher<null>();

  const optimisticPinned =
    pinFetcher.formData?.get('intent') === 'toggle-pin'
      ? !project.pinned
      : project.pinned;

  const optimisticStatus: ProjectStatus = (() => {
    if (completedFetcher.formData?.get('intent') === 'toggle-completed') {
      return project.status === 'completed' ? 'active' : 'completed';
    }
    if (archiveFetcher.formData?.get('intent') === 'toggle-archive') {
      return project.status === 'archived' ? 'active' : 'archived';
    }
    return project.status;
  })();

  const isPinPending = pinFetcher.state !== 'idle';
  const isCompletedPending = completedFetcher.state !== 'idle';
  const isArchivePending = archiveFetcher.state !== 'idle';

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/projects" className="hover:text-green-700 dark:hover:text-green-400">
          Projects
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100">{project.name}</span>
      </div>

      <div className="border border-green-200 dark:border-green-900 rounded-lg p-6 bg-white dark:bg-gray-800 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {project.name}
            {optimisticPinned && (
              <span className="ml-2 text-yellow-500" title="Pinned">📌</span>
            )}
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[optimisticStatus]}`}>
              {optimisticStatus}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[project.priority]}`}>
              {project.priority}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300">{project.description}</p>

        <p className="text-sm text-gray-400 dark:text-gray-500">
          Created: {project.createdAt}
        </p>

        <div className="border-t border-green-100 dark:border-green-900 pt-4 flex flex-wrap gap-3">
          <pinFetcher.Form method="post">
            <input type="hidden" name="intent" value="toggle-pin" />
            <button
              type="submit"
              disabled={isPinPending}
              className="px-4 py-2 text-sm border border-green-300 dark:border-green-700 rounded hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPinPending ? '...' : optimisticPinned ? 'Unpin' : 'Pin'}
            </button>
          </pinFetcher.Form>

          {optimisticStatus !== 'archived' && (
            <completedFetcher.Form method="post">
              <input type="hidden" name="intent" value="toggle-completed" />
              <button
                type="submit"
                disabled={isCompletedPending}
                className="px-4 py-2 text-sm border border-green-300 dark:border-green-700 rounded hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCompletedPending
                  ? '...'
                  : optimisticStatus === 'completed'
                  ? 'Mark Active'
                  : 'Mark Complete'}
              </button>
            </completedFetcher.Form>
          )}

          <archiveFetcher.Form method="post">
            <input type="hidden" name="intent" value="toggle-archive" />
            <button
              type="submit"
              disabled={isArchivePending}
              className="px-4 py-2 text-sm border border-green-300 dark:border-green-700 rounded hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isArchivePending
                ? '...'
                : optimisticStatus === 'archived'
                ? 'Unarchive'
                : 'Archive'}
            </button>
          </archiveFetcher.Form>

          <Link
            to="/projects"
            className="px-4 py-2 text-sm border border-green-300 dark:border-green-700 rounded hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}
