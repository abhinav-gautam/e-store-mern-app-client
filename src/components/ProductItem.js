import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

const ProductItem = ({ product }) => {

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    // Function to add product to cart and increment cart count
    const handleAddToCart = async () => {
        dispatch(addItemToCart(product))
    }

    return (
        <div className="col d-flex align-items-stretch" key={product.productId}>
            <div className="card mt-5 shadow w-100">
                <img src={product.productImage} alt="" width="100%" />
                <div className="card-body w-100">
                    <p className="h3 text-center">{product.productName}</p>
                    <p className="lead">{product.productDescription}</p>
                    <p className="h5 fw-bold">Price: {product.price}</p>
                    {
                        user.username &&
                        <button className="btn btn-primary mt-3" onClick={handleAddToCart}>Add To Cart <FontAwesomeIcon icon={faCartPlus} /></button>
                    }
                </div>
            </div>
        </div >
    )
}
export default ProductItem;

