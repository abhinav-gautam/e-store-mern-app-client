import React from 'react';

const PaymentOption = () => {
    return (
        <div className="mb-5">
            {/* <!--Payment--> */}
            <div class="h4 mb-3">Payment</div>
            <div class="d-block my-3">
                <div class="form-check">
                    <input id="credit" class="form-check-input" name="paymentMethod" type="radio" checked="" />
                    <label class="fomr-check-label" for="credit">Credit card</label>
                </div>
                <div class="form-check">
                    <input id="debit" class="form-check-input" name="paymentMethod" type="radio" />
                    <label class="fomr-check-label" for="debit">Debit card</label>
                </div>
                <div class="form-check">
                    <input id="paypal" class="form-check-input" name="paymentMethod" type="radio" />
                    <label class="fomr-check-label" for="paypal">Paypal</label>
                </div>
            </div>

            {/* <!--Card details--> */}
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="credit-name">Name on card</label>
                    <input type="text" class="form-control" id="credit-name" />
                    <small class="text-muted">Full name as displayed on card</small>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="credit-number">Credit card number</label>
                    <input type="text" class="form-control" id="credit-number" />
                </div>
            </div>
            <div class="row ">
                <div class="col-md-3 mb-3 me-md-5 me-lg-3 me-xl-1">
                    <label for="credit-expiration">Expiration</label>
                    <input type="text" class="form-control" id="credit-expiration" />
                </div>
                <div class="col-md-3 mb-3">
                    <label for="credit-cvv">CVV</label>
                    <input type="text" class="form-control" id="credit-cvv" />
                </div>
            </div>
            <hr class="mb-4" />

            {/* <!--Checkout button--> */}
            <button class="btn btn-primary btn-lg w-100" type="submit">Continue to checkout</button>

        </div>
    );
}

export default PaymentOption;
