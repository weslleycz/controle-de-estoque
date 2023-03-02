import {
  MemoryRouter as Router,
  Route,
  Routes as ContainerRoutes,
} from 'react-router-dom';
import { Config } from './screens/Config';
import { Home } from './screens/Home';

export default function Routes() {
  return (
    <Router>
      <ContainerRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<Config />} />
      </ContainerRoutes>
    </Router>
  );
}
