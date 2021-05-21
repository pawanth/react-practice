import {Link, NavLink} from 'react-router-dom'
import React, { useState, useEffect, Fragment } from 'react';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
          setIsAuth(true);
        }
      }, []);
    return (
        <header>
            <nav className="container navbar navbar-expand-lg navbar-dark bg-secondary">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-5" id="navbarNavAltMarkup">
                    <span className="navbar-text mx-auto text-warning">
                        Welcome, You are logged in as User
                    </span>
                    <div className="navbar-nav">
                    {isAuth === true ? (
                        <Fragment>
                            {' '}
                            <NavLink className="nav-item nav-link" to="/">Posts</NavLink>
                            <NavLink className="nav-item nav-link" to="/create">Create</NavLink>
                            <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                        </Fragment>
                        ) : (
                        <Fragment>
                            {' '}
                            <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                            <NavLink className="nav-item nav-link" to="/signup">Login</NavLink>
                        </Fragment>
                        )}
                        

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;