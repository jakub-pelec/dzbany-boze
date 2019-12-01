import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ text }) => <p>{text}</p>;

Paragraph.propTypes = {
	text: PropTypes.string
};

export default Paragraph;
