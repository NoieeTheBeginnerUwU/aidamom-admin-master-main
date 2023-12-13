import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ text, color }) => {
  const badgeStyle = {
    backgroundColor: color || 'red',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '10px',
    marginLeft: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  return <div style={badgeStyle}>{text}</div>;
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Badge;
