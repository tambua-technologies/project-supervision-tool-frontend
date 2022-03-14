import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import PropTypes from 'prop-types';

function BackLink({goBack}) {

    return (
        <div className="BackLink" onClick={goBack}>
            <ArrowLeftOutlined />
        </div>

    );

}

export default BackLink;
BackLink.propTypes = {
    goBack: PropTypes.func.isRequired
}

