import React from 'react';
import HomeCart from './HomeCart';
import BillingAddress from './BillingAddress';
import PaymentOption from './PaymentOption';
import FooterOptions from './FooterOptions';
import Footer from './Footer';

const CartPage = () => {

    return (
        <>
            <div className="container top-margin-150">
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <HomeCart />
                    </div>
                    <div className="col-12 col-md-6">
                        <BillingAddress />
                        <PaymentOption />
                    </div>
                </div>

            </div>
            {/* Footer */}
            <FooterOptions />
            <Footer />
        </>
    );
}

export default CartPage;
