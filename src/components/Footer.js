
import React from "react";
import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    Designed by <a
                        href="/"
                        target="_blank" rel="noopener noreferrer">  <img
                            src="/logo_web_studio_5.svg"
                            alt="Logo"
                            className="footer-logo"
                        />
                    </a>
                </p>
            </div>
        </footer>
    );
};