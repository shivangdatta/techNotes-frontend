import React from 'react';

const Spinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div className="neon-spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
};

export default Spinner;
