import React from 'react';
import { Typography } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a
        href="https://jacobbenaim.ca"
        target="_blank"
        rel="noreferer noopener noreferrer"
      >
        Jacob Benaim
      </a>{' '}

      {new Date().getFullYear()}

      {'.'}
    </Typography>
  );
}

export default Copyright;