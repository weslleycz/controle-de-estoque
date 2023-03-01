import { Box } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line import/prefer-default-export, react/function-component-definition
export const ContainerDark = ({ children }: Props) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Box bgcolor="#22262F" color="#ffffff" sx={{ height: '100vh' }}>
        {children}
      </Box>
    </>
  );
};
