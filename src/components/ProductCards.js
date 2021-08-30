import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import ProductItem from "./ProductItem";

const Products = () => {
    const { productsList, productsCount, isProductLoading } = useSelector(state => state.products)
    return (
        <div className="container mb-5">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3  ">
                {
                    isProductLoading &&
                    <LoadingSpinner message=" Loading Products..." />
                }
                {
                    productsCount >= 0
                    &&
                    productsList.map((prod, index) => (
                        <ProductItem product={prod} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Products;