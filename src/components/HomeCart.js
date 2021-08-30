import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { removeCartItem } from '../redux/cartSlice';
import LoadingSpinner from './LoadingSpinner';

const HomeCart = () => {
    const { cartItems, cartCount, isCartLoading } = useSelector(state => state.cart)
    const { path } = useRouteMatch()
    const dispatch = useDispatch()

    const handleRemoveCartItem = (item) => {
        dispatch(removeCartItem(item))
    }

    return (
        <div className={path === "/userdashboard/:username/cart" ? "" : " width-450"}>
            <div className="d-flex justify-content-between align-items-center mb-3 h4">
                <span className="text-dark">Your cart</span>
                <span className="badge bg-secondary rounded-pill">{cartCount}</span>
            </div>

            <ul className={path === "/userdashboard/:username/cart" ? "list-group list-group-scroll-cart mb-3" : "list-group list-group-scroll mb-3"}>
                {
                    !cartCount
                        ? <>
                            {
                                isCartLoading
                                    ? <LoadingSpinner message=" Loading Cart..." />
                                    : <li className="list-group-item d-flex justify-content-between">
                                        <div>
                                            <h6 className="">Nothing to show here</h6>
                                        </div>
                                    </li>
                            }
                        </>
                        : <>
                            {
                                cartItems.map((item, index) => (
                                    <li className="list-group-item d-flex justify-content-between">
                                        <div>
                                            <h6 className="">{item.productName}</h6>
                                            {
                                                path === "/userdashboard/:username/cart"
                                                    ? <>
                                                        <img src={item.productImage} width="200px" alt="" /><br />
                                                        <small className="text-muted">{item.productDescription}</small>
                                                    </>
                                                    : <small className="text-muted">{item.productDescription.slice(0, 40)}...</small>

                                            }
                                        </div>
                                        <div className="text-muted d-flex flex-column align-items-end">
                                            <div>
                                                Rs. {item.price}
                                            </div>
                                            <div onClick={() => handleRemoveCartItem({ item, index })} className="cursor-pointer"><FontAwesomeIcon icon={faTrashAlt} /></div>
                                        </div>
                                    </li>
                                ))
                            }
                            <li className="list-group-item d-flex justify-content-between ">
                                <span>Total </span>
                                <strong>Rs.
                                    {
                                        cartItems.map(item => +item.price).reduce((total, current) => total += current)
                                    }
                                </strong>
                            </li>
                        </>
                }

            </ul>
            {/* {
                cartCount >= 0 &&
               
            } */}
            <div className="card p-2 ms-auto mb-5">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Promo code" />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-secondary">Redeem</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeCart;
