/* eslint-disable react-hooks/exhaustive-deps */
import { faGifts, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, BrowserRouter as Router, useRouteMatch, useHistory, } from 'react-router-dom';
import { Redirect, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import resetAllState from '../helpers/resetAllState';
import { setError } from '../redux/errorSlice';
import { setUser } from '../redux/userSlice';
import Message from './Message';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const AdminDashboard = () => {
    const { username } = useParams()
    const { path, url } = useRouteMatch()
    const history = useHistory()
    const { productsError } = useSelector(state => state.products)

    const dispatch = useDispatch()
    const { user, userErrors } = useSelector(state => state.user)

    useEffect(() => {
        if (productsError === "jwt expired" || productsError === "token not available") {
            resetAllState(dispatch)
            dispatch(setError("Session expired. Please login again."))
            history.push("/")
        }
    }, [productsError]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        const token = localStorage.getItem("token")
        if (storedUser && storedUser.role === "admin" && token) {
            if (!Object.keys(user).length) {
                dispatch(setUser(storedUser))
                history.push(`/admindashboard/${storedUser.username}`)
            }
        } else if (user.role !== "admin") {
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

                productsError && <Message message={productsError} variant="danger" />
            }
            <div className="container mt-5">
                <h2>Welcome to Admin Dashboard, {username.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}</h2>
                <ul class="nav nav-pills mx-auto mt-3">
                    <li class="nav-item">
                        <NavLink className="nav-link text-decoration-none" activeClassName="nav-link active" to={`${url}/view-products`}><FontAwesomeIcon icon={faGifts} /> View Products</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link text-decoration-none " activeClassName="nav-link active" to={`${url}/add-product`}><FontAwesomeIcon icon={faPlusSquare} /> Add Product</NavLink>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path={`${path}/view-products`}>
                    <ProductList />
                </Route>
                <Route exact path={`${path}/add-product`}>
                    <ProductForm />
                </Route>
            </Switch>
            <Redirect to={`${url}/view-products`} />
        </Router>
    );
}

export default AdminDashboard;
