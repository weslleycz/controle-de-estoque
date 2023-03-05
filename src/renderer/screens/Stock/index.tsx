import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  ThemeProvider,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { notifySuccess } from 'renderer/components/atoms/Notify';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';
import { GRID_DEFAULT_LOCALE_TEXT } from 'renderer/languages/pt-br';
import { api } from 'renderer/services/apí';
import { ThemeModel } from 'renderer/store/theme.store';
import { IProduct } from 'renderer/types/IProduct';
import './style.scss';

export const Stock = () => {
  const theme = useStoreState((state: ThemeModel) => state.theme) as string;

  const [list, setList] = useState<IProduct[]>([]);

  const { isLoading, data, refetch }: any = useQuery('repoData', async () => {
    try {
      const res = (await (await api.get('/products')).data.data) as IProduct[];
      setList(res);
    } catch (error) {
      setList([]);
    }
  }) as unknown as IProduct[];

  const handleDelete = async (id: string) => {
    notifySuccess('Apagado com sucesso!!');
    await api.delete(`/products/${id}`);
    refetch();
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 300 },
    { field: 'code_bar', headerName: 'Código de Barras', width: 130 },
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
      width: 350,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Box style={{ cursor: 'pointer' }}>
            <IconButton sx={{ marginLeft: 26 }} aria-label="Editar">
              <EditIcon onClick={() => console.log(params.row.id)} />
            </IconButton>
            <IconButton sx={{ marginLeft: 2 }} aria-label="Excluir">
              <DeleteIcon
                color="error"
                onClick={() => handleDelete(params.row.id.toString())}
              />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleFilter = (valor: string) => {
    if (valor != '') {
    } else {
    }
  };

  return (
    <>
        <Grid container>
          <Grid item xs={4} md={2}>
            <Menu />
          </Grid>
          <Grid item xs={30} md={10}>
            <Header title="Estoque" />
            <Container sx={{ height: 450, width: '100%', marginTop: 2 }}>
              <Box
                sx={{
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  borderBottomStyle: 'none',
                }}
                className="conteiner"
              >
                <Stack
                  padding={2}
                  marginLeft={1}
                  marginRight={5}
                  direction="row"
                  spacing={60}
                >
                  <Paper
                    sx={{
                      p: '10px 5px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '40%',
                    }}
                  >
                    <InputBase
                      onChange={(e) => handleFilter(e.target.value)}
                      sx={{
                        width: 400,
                        marginLeft: 1,
                      }}
                      placeholder="Nome ou código de barras"
                    />
                    <IconButton
                      type="button"
                      sx={{ p: '10px' }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Produto
                  </Button>
                </Stack>
              </Box>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <DataGrid
                  className="table"
                  rows={list}
                  columns={columns}
                  loading={isLoading}
                  pageSize={5}
                  getRowId={(rows) => rows.id}
                  rowsPerPageOptions={[5]}
                  autoPageSize
                  localeText={GRID_DEFAULT_LOCALE_TEXT}
                />
              )}
            </Container>
          </Grid>
        </Grid>
    </>
  );
};
