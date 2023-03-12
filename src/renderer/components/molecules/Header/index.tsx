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
          spacing={{ xs: 4, sm: 6, md: 50 }}
        >
          <Box width={'55%'} padding={2}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
