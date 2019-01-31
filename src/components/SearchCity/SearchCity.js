import React from 'react';

import styles from './SearchCity.module.css'

const SearchCity = (props) => {
    return ( 
        <input type="text" value={props.city} onChange={props.handleChange} className={styles.searchBox} />
     );
}
 
export default SearchCity;