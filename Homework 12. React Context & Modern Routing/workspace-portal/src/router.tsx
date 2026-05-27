import { createBrowserRouter } from 'react-router-dom';
import Root, { rootLoader } from './routes/root';
import Dashboard from './routes/dashboard';
import Projects, { projectsLoader, projectsAction } from './routes/projects';
import ProjectDetails, {
  projectDetailsLoader,
  projectDetailsAction,
} from './routes/project-details';
import Settings from './routes/settings';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'projects',
        element: <Projects />,
        loader: projectsLoader,
        action: projectsAction,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDetails />,
        loader: projectDetailsLoader,
        action: projectDetailsAction,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);

export default router;
