/* eslint-disable react-hooks/exhaustive-deps */
import { faGifts, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch, NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import resetAllState from '../helpers/resetAllState';
import { loadCart } from '../redux/cartSlice';
import { setError } from '../redux/errorSlice';
import { setUser } from '../redux/userSlice';
import CartPage from './CartPage';
import Message from './Message';
import ProductsPage from './ProductsPage';

const UserDashboard = () => {

    const { cartCount, cartError } = useSelector(state => state.cart)
    const { user, userErrors } = useSelector(state => state.user)
    const history = useHistory()
    const { username } = useParams()
    const { path, url } = useRouteMatch()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!cartCount) {
            dispatch(loadCart())
        }
    }, [cartCount]);

    useEffect(() => {
        if (cartError === "jwt expired" || cartError === "token not available") {
            resetAllState(dispatch)
            dispatch(setError("Session expired. Please login again."))
            history.push("/")
        }
    }, [cartError]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        const token = localStorage.getItem("token")
        if (storedUser && storedUser.role === "user" && token) {
            if (!Object.keys(user).length) {
                dispatch(setUser(storedUser))
                history.push(`/userdashboard/${storedUser.username}`)
            }
        } else if (user.role !== "user") {
            resetAllState(dispatch)
            dispatch(setError("Unauthorized access detected. Please login again."))
            history.push("/")
        }
    }, [user]);

    return (
        <Router>
            {
                userErrors && <Message message={userErrors} variant="danger" />
            }{

                cartError && <Message message={cartError} variant="danger" />
            }
            <div className="container mt-5">
                <h1>Welcome, {username.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}</h1>
                <ul class="nav nav-pills mx-auto mt-3">
                    <li class="nav-item">
                        <NavLink className="nav-link text-decoration-none " activeClassName="nav-link active" to={`${url}/products`}><FontAwesomeIcon icon={faGifts} /> Products</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link text-decoration-none position-relative" activeClassName="nav-link active position-relative" to={`${url}/cart`}><FontAwesomeIcon icon={faShoppingCart} /> Cart  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartCount}
                        </span></NavLink>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path={`${path}/products`}>
                    <ProductsPage />
                </Route>
                <Route exact path={`${path}/cart`}>
                    <CartPage />
                </Route>
            </Switch>
            <Redirect to={`${url}/products`} />
        </Router>
    );
}

export default UserDashboard;
