import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { ThemeModel } from 'renderer/store/theme.store';
import './style.scss';

export const Header = () => {
  const addTheme = useStoreActions(
    (state: ThemeModel) => state.addTheme
    // eslint-disable-next-line no-unused-vars
  ) as unknown as (valor: string) => void;
  const theme = useStoreState((state: ThemeModel) => state.theme) as string;

  const handlingTheme = () => {
    window.electron.store.set('theme', theme === 'dark' ? 'light' : 'dark');
    theme === 'dark' ? addTheme('light') : addTheme('dark');
  };

  return (
    <>
      <Box className="container">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 4, sm: 6, md: 70 }}
        >
          <Box padding={3}>
            <Typography variant="h5" gutterBottom>
              Dashboard
            </Typography>
          </Box>
          <Box className="btn-avatar">
            <Stack
              padding={3}
              alignItems={'center'}
              direction="row"
              spacing={2.6}
            >
              {theme === 'dark' ? (
                <DarkModeIcon
                  onClick={() => handlingTheme()}
                  sx={{ cursor: 'pointer' }}
                />
              ) : (
                <Brightness6Icon
                  onClick={() => handlingTheme()}
                  sx={{ cursor: 'pointer' }}
                />
              )}
              <Box>
                <Avatar sx={{ bgcolor: '#1ED760' }}>W</Avatar>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                weslleysouza22@gmail.com
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
