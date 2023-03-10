import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './style.scss';

type Pros = {
  title: string;
};

export const Header = ({ title }: Pros) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box className="container">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 4, sm: 6, md: 50 }}
        >
          <Box width={"55%"} padding={2}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          </Box>
          <Box>
            <h2>{time.toLocaleTimeString()}</h2>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
