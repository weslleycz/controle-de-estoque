import {
  MemoryRouter as Router,
  Route,
  Routes as ContainerRoutes,
} from 'react-router-dom';
import { Config } from './screens/Config';
import { Stock } from './screens/Stock';

export default function Routes() {
  return (
    <Router>
      <ContainerRoutes>
        {/* <Route path="/" element={<Caixa />} /> */}
        <Route path="/" element={<Stock />} />
        <Route path="/config" element={<Config />} />
      </ContainerRoutes>
    </Router>
  );
}
