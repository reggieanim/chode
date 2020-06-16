import React from 'react';
import "./loader.scss"

const Loader = (props) => {
        return (
            <div class="spinner">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                
            </div>
        );
}

export default Loader;