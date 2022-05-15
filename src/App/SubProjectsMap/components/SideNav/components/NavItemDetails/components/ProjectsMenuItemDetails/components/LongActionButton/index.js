import {Button} from "antd";
import PropTypes from 'prop-types';
import {SelectOutlined} from "@ant-design/icons";
import React from "react";
import './styles.css';

function LongActionButton({title, handleOnclick}) {

    return (
        <Button style={{width: '100%'}} className='LongActionButton' onClick={handleOnclick}>
            <a >
                <span style={{paddingRight: '10px'}}>{title}</span>
                <SelectOutlined rotate={90}/>
            </a>
        </Button>
    )
}

export default LongActionButton;

LongActionButton.propTypes = {
    title: PropTypes.string.isRequired,
    handleOnclick: PropTypes.func.isRequired
}
