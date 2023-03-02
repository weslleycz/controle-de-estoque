/* eslint-disable react/button-has-type */

import { Grid } from '@mui/material';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';

export function Home() {
  return (
    <>
      <Grid container>
        <Grid item xs={4} md={2}>
          <Menu />
        </Grid>
        <Grid item xs={30} md={10}>
          <Header title="Caixa" />
        </Grid>
      </Grid>
    </>
  );
}
