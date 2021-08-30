
const BillingAddress = () => {
    return (
        <div class="">

            <div class="h4">Billing Address</div>

            <form action="#">
                {/* <!--First and Last Name--> */}
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" required="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value="" required="" />
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>
                </div>

                {/* <!--Username--> */}
                <div class="mb-3">
                    <label for="username">Username</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div>
                        <input type="text" class="form-control" id="username" placeholder="Username" />
                    </div>
                </div>

                {/* <!--Email--> */}
                <div class="mb-3">
                    <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                </div>

                {/* <!--Address--> */}
                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St" />
                </div>

                {/* <!--Address 2 --> */}
                <div class="mb-3">
                    <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                    <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                </div>

                {/* <!--Country State Zip--> */}
                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <select class="form-select w-100" id="country">
                            <option value="">Choose...</option>
                            <option>India</option>
                        </select>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="state">State</label>
                        <select class="form-select d-block w-100" id="state" required="">
                            <option value="">Choose...</option>
                            <option>Gujarat</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" />
                    </div>
                </div>

                <hr class="mb-4" />

                {/* <!--Shipping checkboxes--> */}
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="same-address" />
                    <label class="form-check-label" for="same-address">Shipping address is the same as my billing
                        address</label>
                </div>
                <div class="form-check mb-5">
                    <input class="form-check-input" type="checkbox" id="save-info" />
                    <label class="form-check-label" for="save-info">Save this information for next time</label>
                </div>


            </form>
        </div>
    );
}

export default BillingAddress;
