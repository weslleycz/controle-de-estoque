import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';
import { GRID_DEFAULT_LOCALE_TEXT } from 'renderer/languages/pt-br';
import { ThemeModel } from 'renderer/store/theme.store';
import './style.scss';

export const Stock = () => {
  const produtos = [
    {
      id: 1,
      name: 'Bala Fini Tubes Morango 80g',
      price: 799,
      quantity: 35,
      code_bar: 'yhjjj',
    },
    {
      id: 2,
      name: 'Bala Fini Tubes Morango 80g',
      price: 799,
      quantity: 35,
      code_bar: 'yhjjj',
    },
  ];

  const [list, setList] = useState(produtos);

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const theme = useStoreState((state: ThemeModel) => state.theme) as string;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
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
      valueFormatter: ({ value }) => currencyFormatter.format(value / 100),
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
              <EditIcon
                sx={{ color: theme === 'dark' ? '#ffffff' : '' }}
                onClick={() => console.log(params.row.id)}
              />
            </IconButton>
            <IconButton sx={{ marginLeft: 2 }} aria-label="Excluir">
              <DeleteIcon
                color="error"
                onClick={() => console.log(params.row.id)}
              />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleFilter = (valor: string) => {
    if (valor != '') {
      setList(
        list.filter((produto) => {
          if (produto.name.toLowerCase().includes(valor.toLowerCase())) {
            return true;
          } else if (
            produto.code_bar.toLowerCase().includes(valor.toLowerCase())
          ) {
            return true;
          }
        })
      );
    } else {
      setList(produtos);
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
          <Container sx={{ height: 400, width: '100%' }}>
            <Box
              sx={{
                border: `${theme === 'dark' ? '1px solid #ffffff' : '1px solid #cfcfcf'}`,
                borderTopRightRadius: 4,
                borderTopLeftRadius:4,
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
                    border: `${theme === 'dark' ? '2px solid #ffffff' : ''}`,
                    p: '10px 5px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '40%',
                    background: theme === 'dark' ? '#22262F' : '',
                  }}
                >
                  <InputBase
                    onChange={(e) => handleFilter(e.target.value)}
                    sx={{
                      width: 400,
                      marginLeft: 1,
                      color: theme === 'dark' ? '#ffffff' : '',
                    }}
                    placeholder="Nome ou código de barras"
                  />
                  <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                  >
                    <SearchIcon
                      sx={{ color: theme === 'dark' ? '#ffffff' : '' }}
                    />
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
            <DataGrid
              sx={{ color: theme === 'dark' ? '#ffffff' : '' }}
              className="table"
              rows={list}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              autoPageSize
              localeText={GRID_DEFAULT_LOCALE_TEXT}
            />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
