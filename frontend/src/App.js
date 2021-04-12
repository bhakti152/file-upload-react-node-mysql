import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import AddComponent from './components/add.component'
import DisplayComponent from './components/display.component'
function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Add Data
          </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/display-data"} className="nav-link">
              Display Data
              </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/"]} component={AddComponent} />
          <Route exact path="/display-data" component={DisplayComponent} />
        </Switch>
      </div>
    </div>
  );
}

export default App;




