import { useUiPreferences } from '../context/UiPreferencesContext';
import type { Density } from '../context/UiPreferencesContext';

export default function Settings() {
  const { theme, density, toggleTheme, setDensity } = useUiPreferences();

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>

      <section className="border border-green-200 dark:border-green-900 rounded-lg p-5 bg-white dark:bg-gray-800 flex flex-col gap-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Appearance</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Currently using {theme} mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-sm border border-green-300 dark:border-green-700 rounded hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300 font-medium"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Density</p>
          <div className="flex gap-3">
            {(['comfortable', 'compact'] as Density[]).map((d) => (
              <label key={d} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="density"
                  value={d}
                  checked={density === d}
                  onChange={() => setDensity(d)}
                  className="accent-green-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{d}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="border border-green-200 dark:border-green-900 rounded-lg p-5 bg-white dark:bg-gray-800 flex flex-col gap-3">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Preferences</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Workspace: Workspace Portal</p>
          <p className="mt-1">Theme preference is persisted to localStorage.</p>
        </div>
      </section>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        These preferences are stored in app-wide React Context and localStorage. They are not part of route data.
      </p>
    </div>
  );
}
