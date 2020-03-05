import React, { Component } from 'react';
import "./loader.scss"

class Loader extends Component {
    render() {
        return (
            <div class="spinner">
                <div class="bar bar1"></div>
                <div class="bar bar2"></div>
            </div>
        );
    }
}

export default Loader;