import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

export const FormeModal = () => {
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
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Criar Novo Produto'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            // onClick={handleMethod}
            fullWidth
            autoFocus
          >
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
