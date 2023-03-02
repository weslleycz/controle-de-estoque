import { Box, Stack, Typography } from '@mui/material';
import './style.scss';

type Pros = {
  title: string;
};

export const Header = ({ title }: Pros) => {
  return (
    <>
      <Box className="container">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 4, sm: 6, md: 71 }}
        >
          <Box padding={2}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          </Box>
          <Box className="btn-avatar">
            {/* <Stack
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
            </Stack> */}
          </Box>
        </Stack>
      </Box>
    </>
  );
};
