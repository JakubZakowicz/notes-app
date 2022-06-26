import React from 'react';
import { Helmet } from 'react-helmet';
import { SeoProps } from '../types';

const Seo: React.FC<SeoProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Seo;
