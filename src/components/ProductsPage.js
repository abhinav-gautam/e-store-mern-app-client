import React from 'react';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import FooterOptions from './FooterOptions';
import HomeCart from './HomeCart';
import ProductCards from './ProductCards';

const ProductsPage = () => {
    const { user } = useSelector(state => state.user)

    return (
        <>
            <div className="container top-margin-150">
                <div className="row mt-5">

                    {/* ProductCards */}
                    <div className={user.username ? "col-md-8" : "col-md-12"}>
                        <h2>Today's Deals</h2>
                        <ProductCards />
                    </div>
                    {
                        user.username
                        &&
                        // {/* Side Pane */}
                        <div class="col-md-4 mt-md-0">
                            {/* Cart */}
                            <HomeCart />
                        </div>
                    }
                </div>


            </div >

            {/* Footer */}
            <FooterOptions />
            <Footer />
        </>
    );
}

export default ProductsPage;
