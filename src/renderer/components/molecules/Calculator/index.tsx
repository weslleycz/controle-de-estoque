import { Paper } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ReactCalculator } from 'simple-react-calculator';
import { useHotkeys } from 'react-hotkeys-hook';
import './style.scss';

const style = {
  position: 'absolute' as 'absolute',
  left: '50%',
  top: '6%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 20,
  boxShadow: 24,
};

type Props = {
  open: Boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export const Calculator = ({ open, handleClose, handleOpen }: Props) => {
  useHotkeys('tab', () => handleClose(), []);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <ReactCalculator />
        </Paper>
      </Modal>
    </>
  );
};
