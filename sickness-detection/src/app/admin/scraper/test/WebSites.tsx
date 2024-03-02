import React from 'react';
import Item from './Item';

const WebSites: React.FC = () => {
  return (
      <div className='h-3/5'>
        <div className='flex justify-between items-center my-5'>
          <h2 className='h-9 text-xl font-bold my-4'>Web Sites</h2>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>Add Web Site</button>
        </div>
        
        <div className='h-5/6 overflow-y-auto'>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>

  );
};

export default WebSites;
