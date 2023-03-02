import Inventory2Icon from '@mui/icons-material/Inventory2';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, Button, List, ListItem } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { ThemeModel } from 'renderer/store/theme.store';
import logoDark from '../../../assets/logo_dark.svg';
import logoLight from '../../../assets/logo_light.svg';
import './style.scss';

export const Menu = () => {
  const theme = useStoreState((state: ThemeModel) => state.theme) as string;
  return (
    <>
      <Box className="cont">
        <List>
          <ListItem sx={{ margin: 3 }} component="div" disablePadding>
            {theme === 'dark' ? (
              <img
                style={{ width: 100, marginTop: 30, opacity: 0.9 }}
                src={logoLight}
                alt="Logo"
                loading="lazy"
              ></img>
            ) : (
              <img
                style={{ width: 100, marginTop: 30, opacity: 0.9 }}
                src={logoDark}
                alt="Logo"
              ></img>
            )}
          </ListItem>
          <ListItem component="div" disablePadding>
            <Button
              color={theme === 'dark' ? 'inherit' : 'primary'}
              size="large"
              startIcon={<ShoppingBasketIcon />}
            >
              <strong>Caixa (F1)</strong>
            </Button>
          </ListItem>

          <ListItem component="div" disablePadding>
            <Button
              color={theme === 'dark' ? 'inherit' : 'primary'}
              size="large"
              startIcon={<Inventory2Icon />}
            >
              <strong>Produtos (F2)</strong>
            </Button>
          </ListItem>
          <ListItem sx={{ marginTop: 45 }} component="div" disablePadding>
            <Button
              color={theme === 'dark' ? 'inherit' : 'primary'}
              size="large"
              startIcon={<LogoutIcon />}
              onClick={() => window.electron.ipcRenderer.exit()}
            >
              <strong>Sair (Esc)</strong>
            </Button>
          </ListItem>
        </List>
      </Box>
    </>
  );
};
