import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { notifySuccess } from 'renderer/components/atoms/Notify';
import { FormeModal } from 'renderer/components/molecules/FormeModal';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';
import { Modal } from 'renderer/components/molecules/Modal';
import { GRID_DEFAULT_LOCALE_TEXT } from 'renderer/languages/pt-br';
import { api } from 'renderer/services/apí';
import { IProduct } from 'renderer/types/IProduct';
import './style.scss';

export const Stock = () => {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const [list, setList] = useState<IProduct[]>([]);
  const [products, setProduct] = useState<IProduct[]>([]);

  const { isLoading, data, refetch }: any = useQuery('repoData', async () => {
    try {
      const res = (await (await api.get('/products')).data.data) as IProduct[];
      setList(res);
      setProduct(res);
    } catch (error) {
      setList([]);
    }
  }) as unknown as IProduct[];

  const handleDelete = async () => {
    notifySuccess('Apagado com sucesso!!');
    await api.delete(`/products/${id}`);
    refetch();
    setOpen(false);
  };

  const handleOpemModal = (id: string) => {
    setID(id);
    setOpen(true);
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
                onClick={() => handleOpemModal(params.row.id.toString())}
              />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleFilter = (valor: string) => {
    if (valor !== '') {
      const result = products.filter((product) => {
        if (product.name.toLowerCase().includes(valor.toLowerCase())) {
          return true;
        } else if (
          product.code_bar
            .toLowerCase()
            .includes(valor.toLowerCase().toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
      setList(result);
    } else {
      refetch();
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
                <FormeModal />
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
      <Modal
        text="Você tem certeza que deseja apagar este produto? Esta ação não pode
            ser desfeita e todos os dados relacionados a ele serão
            permanentemente excluídos."
        title="Apagar produto"
        open={open}
        handleClose={handleClose}
        handleMethod={handleDelete}
      />
    </>
  );
};
