import React from 'react';
import PropTypes from 'prop-types';

const DateBadge = () => {
  const badgeStyle = {
    backgroundColor: 'red', // Customize the badge color
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(50%, -200%)',
  };

  return <div style={badgeStyle}></div>;
};

export default DateBadge;
