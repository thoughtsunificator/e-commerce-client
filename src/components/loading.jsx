import React from 'react';
import '../loading.css';

export default class Loading extends React.Component {
    render() {
        return (
            <>
            <div className="about">
                <a class="bg_links social portfolio" href="https://www.rafaelalucas.com" rel="noopener noreferrer" target="_blank">
                    <span class="icon"></span>
                </a>
                <a class="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" rel="noopener noreferrer" target="_blank">
                    <span class="icon"></span>
                </a>
                <a class="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" rel="noopener noreferrer" target="_blank">
                    <span class="icon"></span>
                </a>
                <a class="bg_links logo"></a>
            </div>

            <div className="content">
                <div className="planet">
                    <div className="ring"></div>
                        <div className="cover-ring"></div>
                    <div className="spots">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>
                </div>
                <p>loading</p>
            </div>
            </>
        );
    }
}
