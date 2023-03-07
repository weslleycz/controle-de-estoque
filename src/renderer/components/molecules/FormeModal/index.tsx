import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

type Props = {
  refetch: () => void;
};

export const FormeModal = ({ refetch }: Props) => {
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
    name: Yup.string().required('Required'),
    price: Yup.number().positive().required('Required'),
    quantity: Yup.number().positive().required('Required'),
    code_bar: Yup.string().required('Required'),
  });

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        onClick={() => handleOpen()}
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Produto
      </Button>
      <Dialog
        sx={{ padding: 5 }}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Formik
          initialValues={{
            name: '',
            price: 0,
            quantity: 1,
            code_bar: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm, setErrors }) => {
            try {
              const {code_bar,name,price,quantity}=values;
              await api.post('/products', {
                code_bar,
                name,
                price:price*100,
                quantity
              });
              refetch();
              handleClose();
              notifySuccess('Produto criado com sucesso');
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
                  {'Criar Novo Produto'}
                </DialogTitle>
                <DialogContent>
                  <Box>
                    <Stack spacing={2}>
                      <TextField
                        required
                        sx={{ width: 400, marginTop: 2 }}
                        label="Nome"
                        color={
                          errors.name && touched.name ? 'error' : 'primary'
                        }
                        autoFocus
                        onBlur={handleBlur('name')}
                        value={values.name}
                        onChange={handleChange('name')}
                      />
                      <TextField
                        required
                        sx={{ width: 400 }}
                        type={'number'}
                        label="Preço"
                        color={
                          errors.price && touched.price ? 'error' : 'primary'
                        }
                        className={classes.root}
                        autoFocus
                        onBlur={handleBlur('price')}
                        value={values.price}
                        onChange={handleChange('price')}
                      />
                      <TextField
                        required
                        sx={{ width: 400 }}
                        label="Código de barras"
                        autoFocus
                        color={
                          errors.code_bar && touched.code_bar
                            ? 'error'
                            : 'primary'
                        }
                        onBlur={handleBlur('code_bar')}
                        value={values.code_bar}
                        onChange={handleChange('code_bar')}
                      />
                      <TextField
                        required
                        type={'number'}
                        sx={{ width: 400 }}
                        color={
                          errors.quantity && touched.quantity
                            ? 'error'
                            : 'primary'
                        }
                        label="Quantidade"
                        inputProps={{ min: 1 }}
                        autoFocus
                        onBlur={handleBlur('quantity')}
                        value={values.quantity}
                        onChange={handleChange('quantity')}
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
                    Criar
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
