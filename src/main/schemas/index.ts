import { Schema } from 'electron-store';
import { theme } from './theme.schema';
// eslint-disable-next-line no-unused-vars, import/prefer-default-export
export const schema:
  | Schema<{
      config: unknown;
    }>
  | undefined = {
  config: {},
  theme,
  fullscreen: {
    type: 'boolean',
    default: false,
  },
};
