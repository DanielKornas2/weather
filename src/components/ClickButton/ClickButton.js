import React from 'react';

const ClickButton = (props) => {
    return (  
        <div onClick={props.handleClick}>ClickButton</div>
    );
}
 
export default ClickButton;