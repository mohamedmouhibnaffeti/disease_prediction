import React from "react";
import Item from "./Item";
import { AddWebDialog } from "./AddWebDialog";

const WebSites: React.FC = () => {
  return (
    <div className="h-3/5">
      <div className="flex justify-between items-center my-5">
        <h2 className="h-9 text-xl font-bold my-4">Websites</h2>
        <AddWebDialog />
      </div>

      <div className="h-5/6 overflow-y-auto p-2 border border-black">
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

/*
import * as React from "react"
 
import { ScrollArea } from "@/components/ui/scroll-area"
import Item from "./Item"
 

export function S() {
  return (
    <ScrollArea className="h-5/6 rounded-md border p-2 ">
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
    </ScrollArea>
  )
}



import React from 'react';
import { S } from './S';

const WebSites: React.FC = () => {
  return (
      <div className='h-3/5'>
        <div className='flex justify-between items-center my-5'>
          <h2 className='h-9 text-xl font-bold my-4'>Web Sites</h2>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>Add Web Site</button>
        </div>
        
<S />
      </div>

  );
};

export default WebSites;
*/