import { Box, Grid, InputLabel, Stack, TextField } from '@mui/material';
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
          <Box padding={3}>
            <Stack direction="row" spacing={2}>
              <Box width={100}>
                <InputLabel>Quantidade</InputLabel>
                <TextField
                  type={'number'}
                  sx={{ width: '100%' }}
                  inputProps={{ style: { fontSize: 24 },min: 1  }}
                  variant="outlined"
                />
              </Box>
              <Box>
                <InputLabel>Nome ou código de barras</InputLabel>
                <TextField
                  sx={{ width: '120%' }}
                  inputProps={{ style: { fontSize: 24 } }}
                  variant="outlined"
                />
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
