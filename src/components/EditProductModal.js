/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../redux/productsSlice';
import LoadingSpinner from './LoadingSpinner';

const EditProductModal = ({ product, setProduct, index, show, setShow, initialProductState }) => {
    const { isProductLoading, } = useSelector(state => state.products)

    const dispatch = useDispatch()

    const [file, setFile] = useState(null);

    const [error, setError] = useState({});
    const [validate, setValidate] = useState(false);


    const onInputChange = event => {
        const name = event.target.name
        const value = event.target.value

        setProduct({ ...product, [name]: value })
    }

    const validateForm = (product) => {
        let errors = {}
        if (!product.productName) {
            errors.productName = "Product Name is required"
        }
        if (!product.price) {
            errors.price = "Price is required"
        }
        if (!product.productDescription) {
            errors.productDescription = "Product Description is required"
        }
        return errors
    }

    useEffect(() => {
        if (file) {
            setFile(null)
        }
    }, product._id)

    useEffect(() => {
        if (validate) {
            const errors = validateForm(product)
            setError(errors)
        }
    }, [product, file]);

    const onAddProductSubmit = (event) => {
        event.preventDefault()

        const error = validateForm(product)

        if (Object.keys(error).length) {
            setError(error)
            setValidate(true)
        } else {
            setError({})
            setValidate(false)

            // Creating formData object
            const formData = new FormData()

            // Appending image to it
            if (file) {
                formData.append("productImage", file, file.name)
            }

            // Appending productObj
            formData.append("product", JSON.stringify(product))

            // Dispatching add product function of store
            dispatch(editProduct({ id: product._id, formData, index }))

            // Hide Modal
            setShow(false)
        }
    }
    const onFileSelect = (event) => {
        setFile(event.target.files[0])
    }
    return (

        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            onHide={() => setShow(false)}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="" onSubmit={onAddProductSubmit}>

                    {/* Product Name */}
                    <div className="form-floating mt-4">
                        <input
                            type="text" className="form-control" value={product.productName}
                            name="productName" id="productName" placeholder="#"
                            onChange={onInputChange}
                        />
                        {error.productName && <p className="alert alert-danger py-2 mt-2">{error.productName}</p>}

                        <label htmlFor="productName">Product Name</label>
                    </div>
                    {/* Price */}
                    <div className="form-floating mt-4">
                        <input
                            type="number" className="form-control" value={product.price}
                            onChange={onInputChange}
                            name="price" id="price" placeholder="#"
                        />
                        {error.price && <p className="alert alert-danger py-2 mt-2">{error.price}</p>}
                        <label htmlFor="price">Price</label>

                    </div>
                    {/* Product Image */}
                    <div className="form-group mt-4 d-flex justify-content-start">
                        <div>
                            <label htmlFor="formFile" className="form-label">Product Image</label>
                            <div className="d-flex align-items-center me-4">
                                <input
                                    className="form-control " name="productImage"
                                    type="file" id="formFile" accept="image/*"
                                    onChange={onFileSelect}
                                />
                            </div>
                        </div>
                        <div>
                            <img src={product.productImage} alt="" width="100px" />
                        </div>
                        {error.productImage && <p className="alert alert-danger py-2 mt-2">{error.productImage}</p>}
                    </div>
                    {/*Product description*/}
                    <div className="form-floating mt-4">
                        <textarea
                            onChange={onInputChange}
                            className="form-control" placeholder="#"
                            style={{ height: '80px' }} name="productDescription"
                            id="floatingTextarea" value={product.productDescription}
                        >
                        </textarea>
                        {error.productDescription && <p className="alert alert-danger py-2 mt-2">{error.productDescription}</p>}
                        <label htmlFor="password">Product Description</label>
                    </div>
                    {/* Buttons */}
                    <div className="mt-4">
                        <button type="submit" className=" btn btn-success mb-3 me-3">Update</button>
                        <button className="btn btn-danger mb-3" type="reset" onClick={() => { setProduct(initialProductState); setFile(null) }}>Reset</button>
                    </div>
                    {/* Loading spinner */}
                    {
                        isProductLoading &&
                        <LoadingSpinner message=" Adding Product..." />
                    }
                </form>

            </Modal.Body>
        </Modal>

    );
}

export default EditProductModal;
