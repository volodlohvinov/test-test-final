import React from "react";
import "./Footer.scss";



const Footer = () => {
  return (
    <footer>
      <div className="Footer__contacts">
        <div className="Footer__social-links">
            <p className="Footer__manager">Manager contacts:</p>
          <div className="Footer__elipse">
            <a href="https://www.instagram.com/nxrdw4y/" target="_blank">
              <img
                className="Footer__logo"
                src="../static/instagram logo.png"
                alt="insta"
              />
            </a>
          </div>
          <div className="Footer__elipse">
            <a href="https://t.me/NeveRolll" target="_blank">
              <img
                className="Footer__logo"
                src="../static/telegram logo.png"
                alt="telegram"
              />
            </a>
          </div>
        </div>
        <div className="Footer__phone">Call us: 1 (213) 123-45-67
        <div className="Footer__copyright">Smoothie company © 2023</div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
