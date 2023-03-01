import { useStoreActions, useStoreState } from 'easy-peasy';
import { ReactNode, useEffect } from 'react';
import { ContainerDark } from 'renderer/components/molecules/ContainerDark';
import { ContainerLight } from 'renderer/components/molecules/ContainerLight';
import { ThemeModel } from 'renderer/store/theme.store';

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line import/prefer-default-export
export function Container({ children }: Props) {
  const addTheme = useStoreActions(
    (state: ThemeModel) => state.addTheme
    // eslint-disable-next-line no-unused-vars
  ) as unknown as (valor: string) => void;
  const theme = useStoreState((state: ThemeModel) => state.theme) as string;

  useEffect(() => {
    addTheme(window.electron.store.get('theme'));
  }, []);

  // eslint-disable-next-line prettier/prettier
  return (
    // eslint-disable-next-line react/self-closing-comp, react/jsx-no-useless-fragment
    <>
      {theme === 'dark' ? (
        <ContainerDark>{children}</ContainerDark>
      ) : (
        <ContainerLight>{children}</ContainerLight>
      )}
    </>
  );
}
