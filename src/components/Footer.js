import React from 'react';

export function Footer()
{
    return (
            <footer className="footer">
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