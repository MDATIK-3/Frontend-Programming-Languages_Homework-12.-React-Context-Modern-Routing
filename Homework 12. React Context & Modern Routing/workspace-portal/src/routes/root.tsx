import { Outlet, useLoaderData } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { getCurrentUser, getWorkspaceSummary } from '../api/fake-api';
import type { User, WorkspaceSummary } from '../api/fake-api';
import NavBar from '../components/NavBar';
import GlobalPending from '../components/GlobalPending';
import { useUiPreferences } from '../context/UiPreferencesContext';

export interface RootLoaderData {
  user: User;
  workspace: WorkspaceSummary;
}

export async function rootLoader(_args: LoaderFunctionArgs): Promise<RootLoaderData> {
  const [user, workspace] = await Promise.all([getCurrentUser(), getWorkspaceSummary()]);
  return { user, workspace };
}

export default function Root() {
  const { user, workspace } = useLoaderData() as RootLoaderData;
  const { density } = useUiPreferences();

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <GlobalPending />
      <NavBar userName={user.name} workspaceName={workspace.name} />
      <main className={`max-w-5xl mx-auto px-4 ${density === 'compact' ? 'py-4' : 'py-6'}`}>
        <Outlet />
      </main>
    </div>
  );
}
