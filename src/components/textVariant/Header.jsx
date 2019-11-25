import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ text }) => <h1>{text}</h1>;

Header.propTypes = {
    text: PropTypes.string
};

export default Header;
