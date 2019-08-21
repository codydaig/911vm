import React from 'react';

const SubmitButton = (props) => {
    return (  
        <div className="form-group">
            <input className="form-submit" type="submit" value="Submit" onSubmit={props.onSubmit} />
        </div>
    )
}

export default SubmitButton;