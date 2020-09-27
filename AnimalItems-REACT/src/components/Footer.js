import React, { Component } from "react";

const Footer = props => {
  return (
    <footer>
      <p className="footer-links">
        <a
          href="#"
          target="_blank"
        >
          View Source on Github
        </a>
        <span> / </span>
        <a href="mailto:ruwan.wedisa0150@gmail.com" target="_blank">
          Need any help?
        </a>
      </p>
      <p>
        &copy; 2020 <strong>Animal Store</strong> - Buy any thing from one Place
      </p>
    </footer>
  );
};

export default Footer;
