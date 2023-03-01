/* eslint-disable react/button-has-type */

import { Button, Grid } from '@mui/material';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';

// eslint-disable-next-line import/prefer-default-export
export function Home() {
  // const addTheme = useStoreActions(
  //   (state: ThemeModel) => state.addTheme
  //   // eslint-disable-next-line no-unused-vars
  // ) as unknown as (valor: string) => void;
  return (
    <>
      <Grid container>
        <Grid item xs={4} md={2}>
          <Menu />
        </Grid>
        <Grid item xs={30} md={10}>
          <Header />
          <Button variant="contained">Contained</Button>
        </Grid>
      </Grid>
    </>
  );
}
