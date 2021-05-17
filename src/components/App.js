import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Create from './Create'
import Detail from './Detail'
import './App.css';

function App() {
  return (
    <Router className="App">
      <Nav/>
      <div className='container'>
            <div className="row">
                <div className="col-auto mx-auto mt-5">
                <Switch>
                  <Route path="/create" component={Create} />
                  <Route path="/:id" component={Detail} />
                  <Route path="/" exact component={Home} />
                </Switch>
                </div>
            </div>
      </div>

    </Router>
  );
}

export default App;
