import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/productsSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingSpinner from './LoadingSpinner';

const ProductForm = () => {
    const { user } = useSelector(state => state.user)
    const { isProductLoading } = useSelector(state => state.products)
    const history = useHistory()
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [file, setFile] = useState(null);

    const onAddProductSubmit = (product) => {
        // Creating formData object
        const formData = new FormData()

        // Appending image to it
        formData.append("productImage", file, file.name)

        // Appending productObj
        formData.append("product", JSON.stringify(product))

        // Dispatching add product function of store
        dispatch(addProduct(formData))

        // Redirect to view products page
        history.push(`/admindashboard/${user.username}/view-products`)
    }

    const onFileSelect = (event) => {
        setFile(event.target.files[0])
    }

    return (
        <div className="container ">
            <div className="h3 mt-3" >Add a New Product</div>
            <form className=" w-50" onSubmit={handleSubmit(onAddProductSubmit)}>
                {/* Product Name */}
                <div className="form-floating mt-4">
                    <input
                        type="text" className="form-control"
                        name="productName" id="productName" placeholder="#"
                        {...register("productName", { required: true })}
                    />
                    {errors.productName?.type === "required" && <p className="alert alert-danger py-2 mt-2">Product Name is required</p>}
                    <label htmlFor="productName">Product Name</label>
                </div>
                {/* Price */}
                <div className="form-floating mt-4">
                    <input
                        type="number" className="form-control"
                        name="price" id="price" placeholder="#"
                        {...register("price", { required: true })}
                    />
                    {errors.price?.type === "required" && <p className="alert alert-danger py-2 mt-2">Price is required</p>}
                    <label htmlFor="price">Price</label>

                </div>
                {/* Product Image */}
                <div className="form-group mt-4">
                    <label htmlFor="formFile" className="form-label">Product Image</label>
                    <div className="d-flex align-items-center">
                        <input
                            className="form-control" name="productImage"
                            type="file" id="formFile" accept="image/*"
                            onChange={onFileSelect}
                        />
                    </div>
                    {/* {errors.productImage?.type === "required" && <p className="alert alert-danger py-2 mt-2">Product Image is required</p>} */}
                </div>
                {/*Comments*/}
                <div className="form-floating mt-4">
                    <textarea
                        className="form-control" placeholder="#"
                        style={{ height: '80px' }} name="productDescription"
                        id="floatingTextarea"
                        {...register("productDescription", { required: true })}>
                    </textarea>
                    <label htmlFor="password">Product Description</label>
                    {errors.productDescription?.type === "required" && <p className="alert alert-danger py-2 mt-2">Product Description is required</p>}
                </div>
                {/* Buttons */}
                <div className="mt-4">
                    <button className="btn btn-success mb-3 me-3">Add</button>
                    <button className="btn btn-danger mb-3" type="reset">Reset</button>
                </div>
                {/* Loading spinner */}
                {
                    isProductLoading &&
                    <LoadingSpinner message=" Adding Product..." />
                }
            </form>
        </div>
    );
}

export default ProductForm;
