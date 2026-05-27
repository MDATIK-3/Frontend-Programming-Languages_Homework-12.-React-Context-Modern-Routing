import { useNavigation } from 'react-router-dom';

export default function GlobalPending() {
  const navigation = useNavigation();

  if (navigation.state === 'idle') return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-green-500 animate-pulse" />
      <p className="text-center text-xs py-1 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        {navigation.state === 'submitting' ? 'Saving...' : 'Loading...'}
      </p>
    </div>
  );
}
