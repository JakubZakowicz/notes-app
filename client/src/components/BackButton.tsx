import React from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button className="text-left" onClick={() => navigate(-1)}>
      <HiArrowNarrowLeft className="text-3xl inline mb-1 mr-2" />
      Back
    </button>
  );
};

export default BackButton;
