import { Box } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line import/prefer-default-export, react/function-component-definition
export const ContainerLight = ({ children }: Props) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <Box bgcolor="#ffffff" color="#000000" sx={{ height: '100vh' }}>
      {children}
    </Box>
  );
};
