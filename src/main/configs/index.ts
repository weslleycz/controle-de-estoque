import { Schema } from 'electron-store';
// eslint-disable-next-line no-unused-vars, import/prefer-default-export
export const schema:
  | Schema<{
      config: unknown;
    }>
  | undefined = {
  config: {},
  theme: {
    type: 'string',
    default: 'system',
  },
  fullscreen: {
    type: 'boolean',
    default: true,
  },
};
