import React from 'react';

export default function useTheme() {
  const [theme, setTheme] = React.useState('dark');

  React.useEffect(() => {
    function handleTheme() {
      const currentTheme = window.localStorage.getItem('igt') || 'dark';
      setTheme(currentTheme);
    }

    handleTheme();

    window.addEventListener('storage', handleTheme);

    return () => {
      window.removeEventListener('storage', handleTheme);
    };
  }, [setTheme]);

  return [theme, setTheme];
}
