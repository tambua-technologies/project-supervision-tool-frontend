
import React from 'react';
import {AutoComplete, Input} from "antd";
import PropTypes from 'prop-types';
import './styles.css';


function CustomSearch({placeholder}) {
    return (
        <AutoComplete
            className='CustomSearch'
            dropdownMatchSelectWidth={252}
            style={{ width: '100%' }}
            options={[]}
            onSelect={()=> {}}
            onSearch={() => {}}
        >
            <Input.Search size="large" placeholder={placeholder}  />
        </AutoComplete>
    );
}

export default CustomSearch;

CustomSearch.propTypes ={
    placeholder: PropTypes.string,
}

CustomSearch.defaulltProps = {
    placeholder: '',
}

