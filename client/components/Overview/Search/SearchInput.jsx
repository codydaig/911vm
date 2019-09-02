import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const InputDiv = styled.div`
  margin: 0 10px 10px 10px;
  text-align: center;
`;

const InputField = styled.input`
  border-radius: 4px;
  border: 1px solid #bbb;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px 8px;
`

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // TODO: when click on backspace, not a fresh set of list of volunteers will be rendered.
  handleChange(event) {
    this.props.textChange(event);
    if (event.target.value === "") {
      this.props.clearSearchInput();
    }
  };

  render() {
    return (
      <InputDiv>
        <InputField onChange={this.handleChange} />
      </InputDiv>
    );
  }
}

export default SearchInput;