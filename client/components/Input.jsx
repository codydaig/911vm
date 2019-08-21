import React from 'react';

const Input = (props) => {
    return (  
        <div className="form-group">
            <label htmlFor={name} className="form-label">{props.label}:</label>
            <input
                className="form-input"
                name={name}
                type="text"
                onChange={props.handle}
                value={props.value}
            />
        </div>
    )
}

export default Input;