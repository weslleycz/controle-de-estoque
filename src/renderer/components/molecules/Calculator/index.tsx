import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useStoreState } from 'easy-peasy';
import { useHotkeys } from 'react-hotkeys-hook';
import { ThemeModel } from 'renderer/store/theme.store';
import { ReactCalculator } from 'simple-react-calculator';
import './style.scss';

const style = {
  position: 'absolute' as 'absolute',
  left: '50%',
  top: '2%',
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
  const theme = useStoreState((state: ThemeModel) => state.theme) as string;
  useHotkeys('tab', () => handleClose(), []);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={
            theme === 'dark' ? 'container-modal-dark' : 'container-modal-light'
          }
          sx={style}
        >
          <Box
            height={690}
            bgcolor={
              theme === 'dark'
                ? 'rgba(27, 26, 26, 0.959)'
                : 'rgba(255, 255, 255, 0.993)'
            }
          >
            <ReactCalculator />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
