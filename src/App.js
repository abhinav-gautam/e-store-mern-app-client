/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Route, Switch, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { useEffect } from 'react';
import { getProducts } from './redux/productsSlice';
import resetAllState from './helpers/resetAllState';
import Message from './components/Message';
import PageNotFound from './components/PageNotFound';
import { setUser } from './redux/userSlice';
import { useHistory } from 'react-router-dom';

function App() {
  const { isAuth, user, } = useSelector(state => state.user)
  const { productsCount, } = useSelector(state => state.products)
  const { error } = useSelector(state => state.error)
  const history = useHistory()

  const dispatch = useDispatch()

  // Function to handle logout
  const handleLogout = () => {
    resetAllState(dispatch)
    history.push("/")
  }

  const activeLinkStyle = {
    fontWeight: "bold",
    color: "red"
  }

  const adminPath = "/admindashboard/:username"
  const userPath = "/userdashboard/:username"

  useEffect(() => {
    if (productsCount <= 0) {
      dispatch(getProducts())
    }
  }, [productsCount]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")
    if (storedUser && token) {
      dispatch(setUser(storedUser))
      if (storedUser.role === "admin") {
        history.push(`/admindashboard/${storedUser.username}`)
      } else {
        history.push(`/userdashboard/${storedUser.username}`)
      }
    }
  }, []);

  return (
    <>
      {
        error && <Message message={error} variant="danger" />
      }

      {/* Navbar */}
      <div >
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" >
          {/* <div className="container-fluid "> */}

          {/* Title */}
          <a className="navbar-brand fs-1 text-decoration-none ms-5 cursor-pointer">E-Store</a>

          {/* Collapse Button */}
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav */}
          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav justify-content-evenly ms-auto me-5">
              {
                !isAuth
                  ?
                  <>
                    <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink></li>
                    <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink></li>
                    <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</NavLink></li>
                  </>
                  :
                  <>
                    <li class="nav-item dropdown me-5">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user.profilePicture} className="border border-dark rounded-circle" width="80px" alt="" />
                      </a>
                      <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                        <li className="nav-item" ><NavLink exact activeStyle={activeLinkStyle} className="nav-link text-dark" to="/" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavLink></li>
                      </ul>
                    </li>
                  </>
              }
            </ul>
          </div>
        </nav >

      </div>

      {/* Switch */}
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path={[userPath, `${userPath}/products`, `${userPath}/cart`]}>
          <UserDashboard />
        </Route>
        <Route exact path={[adminPath, `${adminPath}/view-products`, `${adminPath}/add-product`]}>
          <AdminDashboard />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
