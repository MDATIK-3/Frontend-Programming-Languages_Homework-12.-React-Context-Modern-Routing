# Workspace Portal

A React + TypeScript + React Router v7 workspace management app built for HW-12.

## Stack

- React 19 + TypeScript (strict)
- React Router v7 (Data Router APIs)
- Tailwind CSS v4
- Vite 8

## Startup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Architecture Notes

The app is built entirely around the route tree. All data loading and mutations are handled at the route boundary — components receive data through `useLoaderData` / `useRouteLoaderData` and never fetch directly.

```
src/
  api/
    fake-api.ts          in-memory store with simulated async delay
  components/
    NavBar.tsx           navigation links + user display
    GlobalPending.tsx    top bar using useNavigation
    ErrorBoundary.tsx    route-level error UI using useRouteError
    ProjectCard.tsx      single project card with status/priority badges
    ProjectFilters.tsx   GET form for URL-driven text + status filter
    CreateProjectForm.tsx  POST form tied to projects route action
  context/
    UiPreferencesContext.tsx  theme + density, persisted to localStorage
  routes/
    root.tsx             root layout: loader, NavBar, Outlet
    dashboard.tsx        reads root loader via useRouteLoaderData
    projects.tsx         loader (URL params), action (create)
    project-details.tsx  loader (by :projectId), action (toggle-pin, toggle-completed)
    settings.tsx         reads + updates UiPreferencesContext
  router.tsx             createBrowserRouter definition (outside rendering)
  main.tsx               UiPreferencesProvider + RouterProvider
```

**State ownership:**

| State | Owner |
|---|---|
| User + workspace summary | Root loader |
| Projects list | Projects loader (re-runs after action) |
| Project detail | Project details loader |
| URL filters (q, status) | URL search params |
| Theme + density | React Context + localStorage |
| Form open/close | Local component state (useState) |

## Used React Router APIs

| API | Where |
|---|---|
| `createBrowserRouter` | `router.tsx` |
| `RouterProvider` | `main.tsx` |
| `loader` | `root.tsx`, `projects.tsx`, `project-details.tsx` |
| `action` | `projects.tsx`, `project-details.tsx` |
| `useLoaderData` | `root.tsx`, `projects.tsx`, `project-details.tsx` |
| `useRouteLoaderData` | `dashboard.tsx` (reads root loader data by id) |
| `useNavigation` | `GlobalPending.tsx`, `ProjectFilters.tsx`, `CreateProjectForm.tsx` |
| `useFetcher` | `project-details.tsx` (pin + complete toggles without navigation) |
| `useActionData` | `CreateProjectForm.tsx` |
| `useSearchParams` | `ProjectFilters.tsx` |
| `Form` | `ProjectFilters.tsx` (GET), `CreateProjectForm.tsx` (POST), `project-details.tsx` (fetcher forms) |
| `NavLink` | `NavBar.tsx` |
| `Outlet` | `root.tsx` |
| `redirect` | `projects.tsx` action (after create) |
| `isRouteErrorResponse` | `ErrorBoundary.tsx` |
| `useRouteError` | `ErrorBoundary.tsx` |

## Used Context Pattern

`UiPreferencesContext` in `src/context/UiPreferencesContext.tsx`:

```typescript
type Theme = 'light' | 'dark';
type Density = 'compact' | 'comfortable';

interface UiPreferences {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  setDensity: (density: Density) => void;
}
```

- **Provider**: `UiPreferencesProvider` wraps `RouterProvider` in `main.tsx`. Initializes theme from `localStorage` so it persists across reloads.
- **Custom hook**: `useUiPreferences()` — throws if used outside the provider.
- **Consumer**: `Settings` page reads and updates both `theme` and `density`. The `dark` class is applied to the provider's wrapper div so all `dark:` Tailwind variants activate app-wide.
- **Constraint**: Context holds only client-owned UI state. Route data (projects, user, workspace) comes exclusively from loaders — never from Context.

## Bonus Features Implemented

- Optimistic UI for Pin/Unpin toggle (via `fetcher.formData` checked before loader revalidates)
- Theme persisted to `localStorage`
