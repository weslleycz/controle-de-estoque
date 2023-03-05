import { Box, createTheme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line import/prefer-default-export, react/function-component-definition
export const ContainerDark = ({ children }: Props) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#06ac98',
        contrastText: '#FFFFFF',
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box
          className="containerDark"
          bgcolor="#22262F"
          color="#ffffff"
          sx={{
            height: '100vh',
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </>
  );
};
