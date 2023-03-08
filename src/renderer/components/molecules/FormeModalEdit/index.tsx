import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { notifyError, notifySuccess } from 'renderer/components/atoms/Notify';
import { api } from 'renderer/services/apí';
import * as Yup from 'yup';
import { IProduct } from '../../../types/IProduct';

type Props = {
  refetch: () => void;
  product: IProduct;
};

export const FormeModalEdit = ({ refetch, product }: Props) => {
  const useStyles = makeStyles({
    root: {
      '& input[type=number]': {
        '-moz-appearance': 'textfield',
        appearance: 'textfield',
      },
      '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  });

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required(),
    price: Yup.number()
      .positive(' Lembre-se de que apenas valores positivos são aceitos.')
      .required('Esse campo e obrigatório'),
    quantity: Yup.number()
      .positive(
        ' Lembre-se de que você precisa informar uma quantidade positiva.'
      )
      .required('Esse campo e obrigatório'),
    code_bar: Yup.string().required('Esse campo e obrigatório'),
  });

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton
        onClick={() => handleOpen()}
        sx={{ marginLeft: 26 }}
        aria-label="Editar"
      >
        <EditIcon />
      </IconButton>
      <Dialog
        sx={{ padding: 5 }}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Formik
          initialValues={{
            name: product.name,
            price: parseFloat((product.price / 100).toFixed(2).toString()),
            quantity: product.quantity,
            code_bar: product.code_bar,
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm, setErrors }) => {
            try {
              const { code_bar, name, price, quantity } = values;
              await api.put(`/products/${product.id}`, {
                code_bar,
                name,
                price: price * 100,
                quantity,
              });
              refetch();
              handleClose();
              notifySuccess('Editado com sucesso');
            } catch (error) {
              notifyError('Ocorreu um erro não espertado ');
            }
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <Form>
                <DialogTitle id="responsive-dialog-title">
                  <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                    <CloseIcon
                      onClick={() => handleClose()}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                  {'Editar Produto'}
                </DialogTitle>
                <DialogContent>
                  <Box>
                    <Stack spacing={2}>
                      <TextField
                        required
                        sx={{ width: 400, marginTop: 2 }}
                        label="Nome"
                        id="name"
                        name="name"
                        autoFocus
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                      <TextField
                        required
                        sx={{ width: 400 }}
                        type={'number'}
                        label="Preço"
                        className={classes.root}
                        autoFocus
                        id="price"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                      />
                      <TextField
                        required
                        sx={{ width: 400 }}
                        label="Código de barras"
                        autoFocus
                        id="code_bar"
                        name="code_bar"
                        value={values.code_bar}
                        onChange={handleChange}
                        error={touched.code_bar && Boolean(errors.code_bar)}
                        helperText={touched.code_bar && errors.code_bar}
                      />
                      <TextField
                        required
                        type={'number'}
                        sx={{ width: 400 }}
                        label="Quantidade"
                        inputProps={{ min: 1 }}
                        autoFocus
                        id="quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        error={touched.quantity && Boolean(errors.quantity)}
                        helperText={touched.quantity && errors.quantity}
                      />
                    </Stack>
                  </Box>
                </DialogContent>
                <DialogActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ margin: 2 }}
                  >
                    Editar
                  </Button>
                </DialogActions>
              </Form>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
