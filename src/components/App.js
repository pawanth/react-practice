import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Create from './Create'
import Detail from './Detail'
import Update from './Update'
import Delete from './Delete'
import './App.css';

function App() {
  return (
    <Router className="App">
      <Nav/>
      <div className='container'>
            <div className="row">
                <div className="col-auto mx-auto mt-5">
                <Switch>
                  <Route path="/create" component={Create}></Route>
                  <Route path="/update/:id" component={Update} />
                  <Route path="/delete/:id" component={Delete} />
                  <Route path="/detail/:id" component={Detail} />
                  <Route path="/" exact component={Home} />
                </Switch>
                </div>
            </div>
      </div>

    </Router>
  );
}

export default App;
