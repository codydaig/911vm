import React from 'react';

const Select = (props) => {
    return (  
        <div className="form-group">
            <label className="form-label" htmlFor={props.name}>{props.label}: </label>
            <select
              name={props.label}
              onChange={props.handle}
              className="form-select"
              >
              {props.options.map(option => {
                return (
                  <option
                    key={option}
                    value={option}
                    label={option} 
                    >{option}
                  </option>
                );
              })}
            </select>
      </div>
    )
}

export default Select;