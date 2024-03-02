import React from 'react';
import Test from '../section2/Test';


const SectionOne: React.FC = () => {
  return (
      <div className="w-full lg:w-2/3 p-4 border border-black sm:mr-2 bg-white">
        <h2 className="text-xl font-bold mb-2">DATA</h2>
        <Test />
      </div>




  );
};

export default SectionOne;