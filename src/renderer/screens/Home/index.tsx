/* eslint-disable react/button-has-type */

import { useStoreActions } from 'easy-peasy';
import { ThemeModel } from '../../store/theme.store';

// eslint-disable-next-line import/prefer-default-export
export function Home() {
  const addTheme = useStoreActions(
    (state: ThemeModel) => state.addTheme
    // eslint-disable-next-line no-unused-vars
  ) as unknown as (valor: string) => void;
  return (
    <button
      onClick={() => {
        const theme = window.electron.store.get('theme');
        if (theme === 'light') {
          addTheme('dark');
          window.electron.store.set('theme', 'dark');
        } else {
          addTheme('light');
          window.electron.store.set('theme', 'light');
        }
      }}
    >
      Click Me!
    </button>
  );
}
