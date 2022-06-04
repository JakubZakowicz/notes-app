import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader: React.FC<{}> = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        strokeWidthSecondary={3}
        color="#EAB309"
        secondaryColor="white"
      />
      <p className="text-2xl mt-5">Loading...</p>
    </div>
  );
};

export default Loader;
