import { useRouteLoaderData, Link } from 'react-router-dom';
import type { RootLoaderData } from './root';

export default function Dashboard() {
  const { user, workspace } = useRouteLoaderData('root') as RootLoaderData;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-green-200 dark:border-green-900 rounded-lg p-4 bg-white dark:bg-gray-800">
          <p className="text-sm text-green-600 dark:text-green-400">Total Projects</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {workspace.totalProjects}
          </p>
        </div>
        <div className="border border-green-300 dark:border-green-800 rounded-lg p-4 bg-green-100 dark:bg-green-950">
          <p className="text-sm text-green-700 dark:text-green-400">Active</p>
          <p className="text-3xl font-bold text-green-800 dark:text-green-300 mt-1">
            {workspace.activeProjects}
          </p>
        </div>
        <div className="border border-green-200 dark:border-green-900 rounded-lg p-4 bg-green-50 dark:bg-green-950/50">
          <p className="text-sm text-green-600 dark:text-green-400">Completed</p>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">
            {workspace.completedProjects}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/projects"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium"
        >
          View All Projects
        </Link>
        <Link
          to="/settings"
          className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-sm font-medium border border-green-300 dark:border-green-800"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
