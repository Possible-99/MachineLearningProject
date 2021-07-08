import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import Dashboard from "./pages/dashboard/dashboard.component"
import Priori from "./pages/priori/priori.component.jsx";
import Metricas from './pages/metricas/metricas.component.jsx';
import ClusteringJerarquico from './pages/clusteringJerarquico/clusteringJerarquico.component.jsx';
import ClusteringParticiional from './pages/clusteringParticional/clusteringParticional.component.jsx';
import './App.less';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/dashboard/priori" component={Priori}/>
        <Route exact path="/dashboard/metricas" component={Metricas}/>>
        <Route exact path="/dashboard/clustering-jerarquico" component={ClusteringJerarquico}/>>
        <Route exact path="/dashboard/clustering-particional" component={ClusteringParticiional}/>>
       >
      </Switch>
    </Router>
   
  );
}

export default App;
