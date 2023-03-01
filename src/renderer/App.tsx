import { ThemeProvider } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import { Container } from './components/organisms/Container';
import Routes from './Routes';
import { store } from './store/theme.store';
import { theme } from './theme';
import './theme/globals.scss';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Container>
          {' '}
          <Routes />
        </Container>
      </StoreProvider>
    </ThemeProvider>
  );
}
