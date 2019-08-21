import React from 'react';

const Email = (props) => {
    return (  
        <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
                className="form-input"
                name="email"
                type="text"
                onChange={props.handleEmail}
            />
        </div>
    )
}

export default Email;