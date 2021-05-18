import {Link, NavLink} from 'react-router-dom'

const Nav = () => (
    <header>
        <nav className="container navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ml-5" id="navbarNavAltMarkup">
                <span className="navbar-text mx-auto text-warning">
                    Welcome, You are logged in as User
                </span>
                <div className="navbar-nav">
                    <NavLink className="navbar-brand" to="/">Posts</NavLink>
                    <NavLink className="navbar-brand" to="/create">Create</NavLink>
                    <a className="nav-item nav-link" href="/logout">Logout</a>
                    <a className="nav-item nav-link" href="/login">Login</a>
                </div>
            </div>
        </nav>
    </header>
);

export default Nav;