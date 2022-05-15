import React from "react";
import PropTypes from 'prop-types';
import './styles.css';


/**
 * @function
 * @name TopSection
 * @description renders top section which has search bar, item title and filter button
 */
function TopSection({title}) {
    return (
        <div className='TopSection'>
             <section>
                <h3>{title}</h3>
            </section>
            {/* <section>
            </section> */}
           </div>
    );

}

export default TopSection;

TopSection.propTypes = {
    title: PropTypes.string,
    searchPlaceHolder: PropTypes.string
}

TopSection.defaultProps = {
    title: '',
    searchPlaceHolder: '',
}
