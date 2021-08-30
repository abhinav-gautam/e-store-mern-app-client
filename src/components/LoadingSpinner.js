import React from 'react';

const LoadingSpinner = ({ message }) => {
    return (
        <div>
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden"></span>
            </div>
            <span class="text-success"> {message}</span>
        </div>
    );
}

export default LoadingSpinner;
