import React from 'react';
import { ThreeBounce } from 'better-react-spinkit';

import classes from './Preloader.module.css';

const preloader = () => (
  <div className={classes.LoadingContainer}>
    <ThreeBounce color="#e8e8e8" size={15} />
  </div>
);

export default preloader;