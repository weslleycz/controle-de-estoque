import {
  MemoryRouter as Router,
  Route,
  Routes as ContainerRoutes,
} from 'react-router-dom';
import { Home } from './screens/Home';

export default function Routes() {
  return (
    <Router>
      <ContainerRoutes>
        <Route path="/" element={<Home />} />
      </ContainerRoutes>
    </Router>
  );
}
