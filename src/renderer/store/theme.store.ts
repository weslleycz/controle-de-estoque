import { Action, action, createStore } from 'easy-peasy';

export interface ThemeModel {
  theme: string;
  addTheme: Action<ThemeModel, string>;
}

// eslint-disable-next-line import/prefer-default-export
export const store = createStore<ThemeModel>({
  theme: 'dark',

  addTheme: action((state, payload: string) => {
    state.theme = payload;
  }),
});
