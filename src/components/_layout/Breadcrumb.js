import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return index === pathnames.length - 1 ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link color="inherit" to={to} key={to}>
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;