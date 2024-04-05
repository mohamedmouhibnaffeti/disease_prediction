// components/Item.tsx
"use client"
import React, { useState } from 'react';
import { MyDialog } from './MyDialogProps';


const Item: React.FC = () => {

  return (
    <div className='flex justify-between items-center border border-black border-3 rounded-lg mb-2 p-2 bg-white'>
      <div className='flex items-center'>
        <label className="relative block cursor-pointer font-normal select-none w-7 h-7 rounded-sm bg-gray-300 hover:bg-gray-200 mr-2">
          <input type="checkbox" id="website2Checkbox" className="opacity-0 cursor-pointer w-0 h-0 peer" />
          <div className="absolute top-1/2 left-1 w-5 h-0.5 bg-gray-800 transform -translate-y-1/2 transition-all duration-700 ease-out-cubic"></div>
          <div className="absolute top-1/2 left-1 w-5 h-0.5 bg-gray-800 transform -translate-y-1/2 peer-checked:rotate-90 transition-all duration-700 ease-out-cubic"></div>
        </label>
        <label htmlFor="website2Checkbox" className='font-bold select-none'>Web site 2</label>
      </div>
      <div className='flex'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          {/* Add your SVG or icon here */}
        </button>
        <MyDialog />
      </div>

      {/* MyDialog for the second item */}
      
    </div>
  );
};

export default Item;
