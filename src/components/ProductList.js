import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../redux/productsSlice';
import EditProductModal from './EditProductModal';
import LoadingSpinner from './LoadingSpinner';


const ProductList = () => {
    const { productsList, productsCount, isProductLoading, isProductUpdating, isProductAdding, isProductDeleting } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const [product, setProduct] = useState({});
    const [index, setIndex] = useState(-1);

    const [show, setShow] = useState(false);


    const handleDeleteProduct = (id, index) => {
        dispatch(deleteProduct({ id, index }))
    }

    const handleEditProduct = (product, index) => {
        setShow(true)
        setProduct(product)
        setIndex(index)
    }

    return (
        <>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="h3 mt-3">All Products</div>
                    <div className="h3 mt-3">Total Products: {productsCount}</div>
                </div>
                {
                    isProductUpdating && <LoadingSpinner message=" Updating Product..." />
                }
                {
                    isProductAdding && <LoadingSpinner message=" Adding Product..." />
                }
                {
                    isProductLoading && <LoadingSpinner message=" Loading Products..." />
                }
                {
                    isProductDeleting && <LoadingSpinner message=" Deleting Products..." />
                }
                <table className="table mt-3 table-bordered table-striped table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>S.No.</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productsCount >= 0 &&
                            productsList.map((product, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td><img src={product.productImage} alt="" width="100px" /></td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.productDescription}</td>
                                    <td>
                                        <span className="cursor-pointer text-primary fs-4 me-3" onClick={() => handleEditProduct(product, index)}>
                                            <button type="button" class="btn btn-link shadow-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </span>

                                        <span className="cursor-pointer text-danger fs-4" onClick={() => handleDeleteProduct(product._id, index)}><FontAwesomeIcon icon={faTrashAlt} /></span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <EditProductModal product={product} setProduct={setProduct} index={index} show={show} setShow={setShow} />
        </>
    );
}

export default ProductList;
