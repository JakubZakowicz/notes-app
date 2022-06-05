import React from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const BackButton: React.FC = () => {
  return (
    <Link to="/">
      <HiArrowNarrowLeft className="text-3xl inline mb-1 mr-2" />
      Back
    </Link>
  );
};

export default BackButton;
