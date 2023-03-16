import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
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
import { useState } from 'react';
import { useQuery } from 'react-query';
import { notifyError } from 'renderer/components/atoms/Notify';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';
import { ModalCancel } from 'renderer/components/molecules/ModalCancel';
import { ModalConfirm } from 'renderer/components/molecules/ModalConfirm';
import { api } from 'renderer/services/apí';
import { IProduct } from 'renderer/types/IProduct';

export const Caixa = () => {
  const [openCancel, setOpenCancel] = useState(false);
  const handleOpenCancel = () => {
    if (selected.length != 0) {
    setOpenCancel(true);
    }
  };
  const handleCloseCancel = () => setOpenCancel(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const { isLoading, error, data, refetch } = useQuery('products', async () => {
    const product = (await (
      await api.get('/products')
    ).data.data) as IProduct[];
    return product;
  });

  const [selected, setSelected] = useState<IProduct[]>([]);
  const [max, setMax] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('0,00');
  const [money, setMoney] = useState(0);
  const [values, setValues] = useState<string[]>([]);
  const [productIndex, setProductIndex] = useState<Number | null>(null);

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

  const handleSeletProduct = (index: number) => {
    setMax(data[index].quantity);
    setProductIndex(index);
    setPrice(
      (data[index].price / 100).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })
    );
  };

  const handleSeletAddProduct = () => {
    if (productIndex != null) {
      const product = data[productIndex] as IProduct;
      const isExist = selected.filter((iten) => iten.id === product.id);
      if (isExist.length === 0) {
        setSelected([
          {
            quantity: quantity,
            code_bar: product.code_bar,
            id: product.id,
            name: product.name,
            price: product.price,
          },
          ...selected,
        ]);
        setMoney(money + product.price * quantity);
        setValues([]);
        setPrice('0,00');
        setQuantity(1);
        setProductIndex(null);
      } else {
        const update = selected.map((iten) => {
          if (iten.id === product.id) {
            const { code_bar, id, name, price } = product;
            return {
              code_bar,
              id,
              name,
              price,
              quantity: iten.quantity + quantity,
            } as IProduct;
          } else {
            return iten;
          }
        });
        setMoney(money + product.price * quantity);
        setSelected(update);
        setValues([]);
        setPrice('0,00');
        setQuantity(1);
        setProductIndex(null);
      }
    }
  };

  const handleSeletCancel = () => {
    setSelected([]);
    setValues([]);
    setPrice('0,00');
    setQuantity(1);
    setProductIndex(null);
    setMoney(0);
    handleCloseCancel();
  };

  const handleConfirm = async () => {
    if (selected.length != 0) {
      try {
        await api.post('/sales', {
          products: selected,
          money: money,
        });
        handleSeletCancel();
      } catch (error) {
        notifyError('Ocorreu um erro inesperado');
      }
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4} md={2}>
          <Menu />
        </Grid>
        <Grid item xs={30} md={10}>
          <Header title="Caixa" />
          {isLoading ? (
            ''
          ) : (
            <Box padding={2}>
              <InputLabel>Nome ou código de barras</InputLabel>
              <Autocomplete
                disablePortal
                value={values}
                options={
                  isLoading
                    ? []
                    : data?.map((product: IProduct, index: number) => {
                        if (product.quantity != 0) {
                          return { label: product.name, index };
                        }
                      })
                }
                size={'medium'}
                onChange={(event, value) => {
                  setValues(value);
                  handleSeletProduct(value?.index as number);
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} />}
              />

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Paper
                    sx={{ marginTop: 1, background: 'none', height: '97%' }}
                  >
                    <Box>
                      <Stack
                        marginTop={1}
                        direction="row"
                        padding={3}
                        spacing={3}
                      >
                        <Box>
                          <InputLabel>Quantidade</InputLabel>
                          <TextField
                            defaultValue={1}
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(e.target.value as unknown as number)
                            }
                            type={'number'}
                            inputProps={{
                              style: { fontSize: 20, width: 100 },
                              min: 1,
                              max: max,
                            }}
                            variant="outlined"
                          />
                        </Box>
                        <Box>
                          <InputLabel>Preço unitário</InputLabel>
                          <TextField
                            disabled
                            inputProps={{ style: { fontSize: 20, width: 100 } }}
                            value={price}
                            variant="outlined"
                          />
                        </Box>
                      </Stack>
                      <Box
                        sx={{
                          padding: 6.5,
                          justifyContent: 'center',
                          marginTop: 9,
                        }}
                      >
                        <Button
                          fullWidth
                          sx={{ width: 400 }}
                          color={'warning'}
                          startIcon={<AddCircleIcon />}
                          onClick={() => handleSeletAddProduct()}
                          size="large"
                          variant="contained"
                        >
                          Adicionar (f12)
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ height: 350, width: '100%' }} marginTop={1}>
                    <DataGrid
                      className="table"
                      rows={selected}
                      loading={isLoading}
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
                          {(money / 100).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
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
                        onClick={() => handleOpenCancel()}
                      >
                        Cancelar venda (f7)
                      </Button>
                      <Button
                        disableElevation
                        startIcon={<DoneIcon />}
                        sx={{ width: 300 }}
                        size="large"
                        variant="contained"
                        onClick={() => handleConfirm()}
                      >
                        Finalizar venda (f10)
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
      <ModalCancel
        handleClose={handleCloseCancel}
        btn="Sim"
        btnClose={'Não'}
        handleMethod={() => handleSeletCancel()}
        open={openCancel}
        text={'Tem certeza que gostaria de cancelar venda?'}
        title={'Cancelamento de Venda'}
      />

      <ModalConfirm
        handleClose={handleCloseConfirm}
        btn="Confirmar"
        btnClose={'Canselar'}
        handleMethod={() => handleConfirm()}
        open={openConfirm}
        text={'Gostaria de imprimir nota?'}
        title={'Imprimir nota'}
      />
    </>
  );
};
