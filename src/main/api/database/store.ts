import Store from 'electron-store';

const store = new Store({
  name: 'database',
  accessPropertiesByDotNotation: true,
  watch:true,
});

export {store}
