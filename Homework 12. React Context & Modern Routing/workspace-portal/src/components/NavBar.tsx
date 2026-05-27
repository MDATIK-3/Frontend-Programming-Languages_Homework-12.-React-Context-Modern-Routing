import { NavLink } from 'react-router-dom';

interface NavBarProps {
  userName: string;
  workspaceName: string;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded text-sm font-medium transition-colors ${
    isActive
      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      : 'text-gray-600 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900/30'
  }`;

export default function NavBar({ userName, workspaceName }: NavBarProps) {
  return (
    <nav className="border-b border-green-200 dark:border-green-900 bg-green-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-green-800 dark:text-green-200">
            {workspaceName}
          </span>
          <div className="flex items-center gap-1">
            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>
            <NavLink to="/settings" className={linkClass}>
              Settings
            </NavLink>
          </div>
        </div>
        <span className="text-sm text-green-700 dark:text-green-400">{userName}</span>
      </div>
    </nav>
  );
}
