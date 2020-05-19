import React from 'react';

export function Footer() {
    const footerStyle = {
            position: 'absolute',
            left: '0',
            bottom: '0',
            right: '0',
        };

    return (
        <footer className="footer" style={footerStyle}>
            <div className="container">
                <div className="row d-flex flex-wrap align-items-center">
                    <div className="col">
                        <div className="copyright_content">
                            ELECTRON &copy; {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}