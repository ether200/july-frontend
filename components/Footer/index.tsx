import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p>Copyright &copy; {currentYear} July. All rights reserved.</p>
    </div>
  );
};

export default Footer;
