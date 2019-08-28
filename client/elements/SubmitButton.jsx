import React from "react";

const SubmitButton = props => {
  return (
    <div className={props.groupClass}>
      <input
        className={props.submitClass}
        type="submit"
        value="Submit"
        onSubmit={props.onSubmit}
      />
    </div>
  );
};

export default SubmitButton;