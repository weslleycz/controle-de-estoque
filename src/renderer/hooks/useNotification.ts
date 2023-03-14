import Logo from '../assets/logo_dark.svg';

type Props = {
  title: string;
  body: string;
};

export const useNotification = ({ body, title }: Props) => {
  window.electron.ipcRenderer.notification(title, body, Logo);
};
