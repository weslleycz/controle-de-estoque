import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { ThemeModel } from 'renderer/store/theme.store';
import './style.scss';

type Pros = {
  title: string;
};

export const Header = ({ title }: Pros) => {
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
          spacing={{ xs: 4, sm: 6, md: 90 }}
        >
          <Box padding={3}>
            <Typography variant="h4" gutterBottom>
              {title}
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
                  sx={{ cursor: 'pointer', ':hover': { opacity: 0.6 } }}
                />
              ) : (
                <Brightness6Icon
                  onClick={() => handlingTheme()}
                  sx={{ cursor: 'pointer', ':hover': { opacity: 0.6 } }}
                />
              )}
              <Box>
                <Avatar sx={{ bgcolor: '#1ED760' }}>A</Avatar>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                admin
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
