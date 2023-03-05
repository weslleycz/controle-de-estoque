import { ThemeProvider } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Notify } from './components/atoms/Notify';
import { Container } from './components/organisms/Container';
import Routes from './Routes';
import { store } from './store/theme.store';
import { theme } from './theme';
import './theme/globals.scss';
const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <Container>
            {' '}
            <Routes />
          </Container>
        </StoreProvider>
      </QueryClientProvider>
      <Notify />
    </ThemeProvider>
  );
}
