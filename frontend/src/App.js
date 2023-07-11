import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.component"
import Priori from "./pages/priori/priori.component.jsx";
import Metricas from './pages/metricas/metricas.component.jsx';
import ClusteringJerarquico from './pages/clusteringJerarquico/clusteringJerarquico.component.jsx';
import ClusteringParticiional from './pages/clusteringParticional/clusteringParticional.component.jsx';
import './App.less';
// import NotFound from "./components/notFound/notFound.component";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/priori" component={Priori}/>
        <Route exact path="/metricas" component={Metricas}/>
        <Route exact path="/clustering-jerarquico" component={ClusteringJerarquico}/>
        <Route exact path="/clustering-particional" component={ClusteringParticiional}/>
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
   
  );
}

export default App;
