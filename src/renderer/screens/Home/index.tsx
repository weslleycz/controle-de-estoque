import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GRID_DEFAULT_LOCALE_TEXT } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid/models';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];

export function Home() {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 130 },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      type: 'number',
      width: 90,
    },
    {
      field: 'price',
      headerName: 'Preço',
      type: 'number',
      width: 130,
      valueFormatter: ({ value }) =>
        (value / 100).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      cellClassName: 'font-tabular-nums',
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Box style={{ cursor: 'pointer' }}>
            <IconButton sx={{ marginLeft: 2 }} aria-label="Excluir">
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={4} md={2}>
          <Menu />
        </Grid>
        <Grid item xs={30} md={10}>
          <Header title="Caixa" />
          <Box padding={2}>
            <InputLabel>Nome ou código de barras</InputLabel>
            <Autocomplete
              disablePortal
              options={top100Films}
              size={'medium'}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Paper sx={{ marginTop: 1, background: 'none' }}>
                  <Box width={'150%'}>
                    <Stack
                      marginTop={1}
                      direction="row"
                      padding={3}
                      spacing={3}
                    >
                      <Box>
                        <InputLabel>Quantidade</InputLabel>
                        <TextField
                          type={'number'}
                          inputProps={{ style: { fontSize: 20, width: 100 } }}
                          variant="outlined"
                        />
                      </Box>
                      <Box>
                        <InputLabel>Preço unitário</InputLabel>
                        <TextField
                          disabled
                          inputProps={{ style: { fontSize: 20, width: 100 } }}
                          value={'3,00'}
                          variant="outlined"
                        />
                      </Box>
                    </Stack>
                    <Box marginTop={14} sx={{ padding: 4 }}>
                      <Stack direction="row" spacing={2}>
                      <Button
                          color={'error'}
                          startIcon={<LocalAtmIcon />}
                          size="large"
                          variant="outlined"
                        >
                          cancelar (f5)
                        </Button>
                        <Button
                          color={'warning'}
                          startIcon={<LocalAtmIcon />}
                          size="large"
                          variant="contained"
                        >
                          Adicionar (f1)
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ height: 350, width: '100%' }} marginTop={1}>
                  <DataGrid
                    className="table"
                    rows={{}}
                    columns={columns}
                    pageSize={5}
                    getRowId={(rows) => rows.id}
                    rowsPerPageOptions={[5]}
                    autoPageSize
                    localeText={GRID_DEFAULT_LOCALE_TEXT}
                  />
                  <Box
                    sx={{
                      borderRadius: 1,
                    }}
                    marginBottom={1}
                    marginTop={1}
                    padding={0.5}
                  >
                    <Stack direction="row" spacing={6}>
                      <Typography variant="h3" gutterBottom>
                        Total:
                      </Typography>
                      <Typography variant="h3" gutterBottom>
                        R$ 42,25
                      </Typography>
                    </Stack>
                  </Box>

                  <Stack spacing={2} direction="row">
                    <Button
                      sx={{ width: 300 }}
                      disableElevation
                      startIcon={<CloseIcon />}
                      size="large"
                      color={'error'}
                      variant="contained"
                    >
                      Cancelar venda (f7)
                    </Button>
                    <Button
                      disableElevation
                      startIcon={<DoneIcon />}
                      sx={{ width: 300 }}
                      size="large"
                      variant="contained"
                    >
                      Finalizar venda (f10)
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
