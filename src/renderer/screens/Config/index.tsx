import { Box, Divider, Grid, Stack, Switch, Typography } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';
import { ThemeModel } from 'renderer/store/theme.store';
import useSystemTheme from 'use-system-theme';
import dark from '../../assets/dark.svg';
import light from '../../assets/light.svg';
import system from '../../assets/system.svg';

export const Config = () => {
  const systemTheme = useSystemTheme();
  const addTheme = useStoreActions(
    (state: ThemeModel) => state.addTheme
  ) as unknown as (valor: string) => void;
  const theme = useStoreState((state: ThemeModel) => state.theme) as string;

  const handlingThemeDark = () => {
    window.electron.store.set('theme', 'dark');
    addTheme('dark');
  };

  const handlingThemeSystem = () => {
    window.electron.store.set('theme', 'system');
    addTheme(systemTheme);
  };

  const handlingThemeLight = () => {
    window.electron.store.set('theme', 'light');
    addTheme('light');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4} md={2}>
          <Menu />
        </Grid>
        <Grid item xs={30} md={10}>
          <Header title="Configurações" />
          <Divider sx={{ marginLeft: 8, marginRight: 8 }} variant="inset" />
          <Stack direction="row" spacing={2}>
            <Box padding={4}>
              <Typography
                sx={{ fontWeight: 'bold' }}
                variant="subtitle1"
                gutterBottom
              >
                Tema da interface
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Selecione ou personalize sua interface de usuário
              </Typography>
            </Box>
            <Box>
              <Stack marginTop={2} direction="row" spacing={2}>
                <Box>
                  <Box
                    onClick={() => handlingThemeSystem()}
                    bgcolor={'ThreeDFace'}
                    sx={{
                      borderRadius: 3,
                      borderColor:
                        window.electron.store.get('theme') === 'system'
                          ? '#077E71'
                          : 'ButtonFace',
                      cursor: 'pointer',
                    }}
                    border={
                      window.electron.store.get('theme') === 'system' ? 4 : 2
                    }
                  >
                    <img width={140} src={system}></img>
                  </Box>
                  <Typography marginTop={1} variant="body2" gutterBottom>
                    Sistema
                  </Typography>
                </Box>

                <Box>
                  <Box
                    bgcolor={'ThreeDFace'}
                    onClick={() => handlingThemeLight()}
                    sx={{
                      borderRadius: 3,
                      borderColor:
                        theme === 'light' &&
                        window.electron.store.get('theme') != 'system'
                          ? '#077E71'
                          : 'ButtonFace',
                      cursor: 'pointer',
                    }}
                    border={
                      theme === 'light' &&
                      window.electron.store.get('theme') != 'system'
                        ? 4
                        : 2
                    }
                  >
                    <img width={140} src={light}></img>
                  </Box>
                  <Typography marginTop={1} variant="body2" gutterBottom>
                    Claro
                  </Typography>
                </Box>

                <Box>
                  <Box
                    onClick={() => handlingThemeDark()}
                    bgcolor={'ThreeDFace'}
                    sx={{
                      borderRadius: 3,
                      borderColor:
                        theme === 'dark' &&
                        window.electron.store.get('theme') != 'system'
                          ? '#077E71'
                          : 'ButtonFace',
                      cursor: 'pointer',
                    }}
                    border={
                      theme === 'dark' &&
                      window.electron.store.get('theme') != 'system'
                        ? 4
                        : 2
                    }
                  >
                    <img width={140} src={dark}></img>
                  </Box>
                  <Typography marginTop={1} variant="body2" gutterBottom>
                    Escuro
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Divider
            sx={{ marginLeft: 8, marginRight: 8, marginTop: 2 }}
            variant="inset"
          />
          <Stack direction="row" spacing={12}>
            <Box padding={4}>
              <Typography
                sx={{ fontWeight: 'bold' }}
                variant="subtitle1"
                gutterBottom
              >
                Modo full screen
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Defina se gostaria utilizar tela cheia
              </Typography>
            </Box>
            <Box>
              <Switch
                sx={{ marginTop: 6 }}
                onClick={() => {
                  window.electron.store.get('fullscreen') === true
                    ? window.electron.store.set('fullscreen', false)
                    : window.electron.store.set('fullscreen', true);
                  window.electron.ipcRenderer.relaunch();
                }}
                defaultChecked={window.electron.store.get('fullscreen')}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
