import React from 'react';

const SearchCity = (props) => {
    return ( 
        <input type="text" value={props.city} onChange={props.handleChange} />
     );
}
 
export default SearchCity;