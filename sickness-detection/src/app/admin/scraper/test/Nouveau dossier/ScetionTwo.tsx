import React from 'react';
import DataOperation from './Table';
import WebSites from './WebSites';
import Data from './ButtonProps';

const SectionTwo: React.FC = () => {
  return (
    <div className='p-4 w-full sm:w-1/3 sm:ml-2'>
      <DataOperation />
      <WebSites />
      <Data />
    </div>
  );
};

export default SectionTwo;
