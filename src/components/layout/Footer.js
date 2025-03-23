import React from 'react'
import './layout.css';
export default function Footer() {
  return (
    <div className='footer'>
      <p>&copy; 2025 canticsoft GmbH. All rights reserved.</p>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
  );
}
