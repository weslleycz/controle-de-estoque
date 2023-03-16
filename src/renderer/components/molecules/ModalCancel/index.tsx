import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
  text: string;
  title: string;
  open: boolean;
  btn:string;
  btnClose:string;
  handleClose: () => void;
  handleMethod: () => void;
};

export const ModalCancel = ({
  text,
  title,
  handleClose,
  open,
  handleMethod,
  btn,
  btnClose
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            {btnClose}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleMethod}
            autoFocus
          >
            {btn}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
