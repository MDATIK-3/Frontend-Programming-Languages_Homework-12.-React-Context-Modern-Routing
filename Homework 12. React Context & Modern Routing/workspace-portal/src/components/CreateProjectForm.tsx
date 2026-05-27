import { Form, useNavigation, useActionData } from 'react-router-dom';
import type { ProjectsActionData } from '../routes/projects';

export default function CreateProjectForm() {
  const navigation = useNavigation();
  const actionData = useActionData() as ProjectsActionData | undefined;
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form
      method="post"
      className="border border-green-200 dark:border-green-900 rounded-lg p-4 bg-green-50 dark:bg-gray-800 flex flex-col gap-3"
    >
      <input type="hidden" name="intent" value="create" />

      {actionData?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{actionData.error}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Project name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter project name"
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          rows={2}
          placeholder="Brief description..."
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            name="priority"
            defaultValue="medium"
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </Form>
  );
}
