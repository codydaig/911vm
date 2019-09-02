import React from "react";
import styled from 'styled-components';

const HeaderText = styled.header`
  text-align: center;
`

const Header = (props) => {
  return (
    <HeaderText className = "component-header">
      <img
        src="//cdn.jsdelivr.net/emojione/assets/png/1f638.png"
        width="32"
        height="32"
        alt=""
      />
      911 Volunteer Management
      <img
        src="//cdn.jsdelivr.net/emojione/assets/png/1f63a.png"
        width="32"
        height="32"
        alt=""
      />
    </HeaderText>
  );
}

export default Header;
