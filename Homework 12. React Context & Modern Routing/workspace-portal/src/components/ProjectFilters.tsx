import { Form, useSearchParams, useNavigation } from 'react-router-dom';

export default function ProjectFilters() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isFiltering = navigation.state === 'loading';

  const q = searchParams.get('q') ?? '';
  const status = searchParams.get('status') ?? 'all';

  return (
    <Form method="get" className="flex items-center gap-3 flex-wrap">
      <input
        type="text"
        name="q"
        defaultValue={q}
        placeholder="Search projects..."
        className="border border-green-300 dark:border-green-800 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-500 w-48"
      />
      <select
        name="status"
        defaultValue={status}
        className="border border-green-300 dark:border-green-800 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-500"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="archived">Archived</option>
      </select>
      <button
        type="submit"
        disabled={isFiltering}
        className="px-4 py-2 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 text-green-700 dark:text-green-300 rounded border border-green-300 dark:border-green-700 disabled:opacity-50"
      >
        {isFiltering ? 'Filtering...' : 'Filter'}
      </button>
      {(q || status !== 'all') && (
        <a
          href="/projects"
          className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline"
        >
          Clear
        </a>
      )}
    </Form>
  );
}
