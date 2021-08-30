import React from 'react';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
    const history = useHistory()

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Page Not Found</h2>
                        <div class="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <button className="btn btn-primary mt-4" onClick={() => history.push("/")}>Back To Home</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
