import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './views/app/Home'
import Create from './views/app/Create'
import Detail from './views/app/Detail'
import Update from './views/app/Update'
import Delete from './views/app/Delete'
import Login from './views/auth/Login'
import Logout from './views/auth/Logout'
import Signup from './views/auth/Signup'
import './styles/App.scss';

function App() {
  return (
    <Router className="App">
      <Navbar/>
      <div className='container'>
            <div className="row">
                <div className="col-auto mx-auto mt-5">
                <Switch>
                  <Route path='/login' component={Login} exact />
                  <Route path='/signup' component={Signup} exact />
                  <Route path='/logout' component={Logout} exact />
                  <Route path="/create" component={Create} />
                  <Route path="/update/:id" component={Update} />
                  <Route path="/delete/:id" component={Delete} />
                  <Route path="/detail/:id" component={Detail} />
                  <Route path="/" component={Home} exact/>
                </Switch>
                </div>
            </div>
      </div>

    </Router>
  );
}

export default App;
