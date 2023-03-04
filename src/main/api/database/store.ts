import Store from 'electron-store';

const store = new Store({
  name: 'database',
  accessPropertiesByDotNotation: true,
});

export {store}
