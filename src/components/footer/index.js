import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className="footer-logo">
                <Link to={`/`}>
                    Vintnerize
                </Link>
            </div>
            <ul className="footer-menu">
                <li>
                    <Link to={`/`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={`/offers`}>
                        Catalog
                    </Link>
                </li>
            </ul>
            <div className="space"></div>
        </footer>
    );
}

export default Footer