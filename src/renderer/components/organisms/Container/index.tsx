import { useStoreActions, useStoreState } from 'easy-peasy';
import { ReactNode, useEffect } from 'react';
import { ContainerDark } from 'renderer/components/molecules/ContainerDark';
import { ContainerLight } from 'renderer/components/molecules/ContainerLight';
import { ThemeModel } from 'renderer/store/theme.store';
import useSystemTheme from 'use-system-theme';

type Props = {
  children: ReactNode;
};

export function Container({ children }: Props) {
  const addTheme = useStoreActions(
    (state: ThemeModel) => state.addTheme
  ) as unknown as (valor: string) => void;
  const theme = useStoreState((state: ThemeModel) => state.theme) as string;

  const systemTheme = useSystemTheme();

  useEffect(() => {
    if (window.electron.store.get('theme') === 'system') {
      addTheme(systemTheme);
    } else {
      addTheme(window.electron.store.get('theme'));
    }
  }, []);

  return (
    <>
      {theme === 'dark' ? (
        <ContainerDark>{children}</ContainerDark>
      ) : (
        <ContainerLight>{children}</ContainerLight>
      )}
    </>
  );
}
