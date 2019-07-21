import React from "react";
import "../../../../Styles/Header.css";

const Header = (props) => {
  return (
    <header className="component-header">
      <img
        src="//cdn.jsdelivr.net/emojione/assets/png/1f638.png"
        width="32"
        height="32"
        alt=""
      />
      911 VM
      <img
        src="//cdn.jsdelivr.net/emojione/assets/png/1f63a.png"
        width="32"
        height="32"
        alt=""
      />
    </header>
  );
}

export default Header;
