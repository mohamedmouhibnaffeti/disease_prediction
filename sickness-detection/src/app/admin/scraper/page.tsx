
import React from 'react';
import SectionOne from './components/section1/SectionOne';
import SectionTwo from './components/section2/ScetionTwo';
import Navbar from './components/navBar/NavBar';

const Page: React.FC = () => {
  return (
      <main className="flex flex-col lg:h-screen  p-4 main-bg "> 
        <Navbar />
        <div className='flex flex-col h-4/5 w-full lg:flex-row-reverse '>
          <SectionTwo />
          <SectionOne />
        </div>
      </main>
  );
};

export default Page;





/*



import React from 'react';
import SectionOne from './components/section1/SectionOne';
import SectionTwo from './components/section2/ScetionTwo';

const Page: React.FC = () => {
  return (
      <main className=" flex sm:h-screen flex-col p-4 bg-slate-400 sm:flex-row-reverse"> 
      <SectionTwo />
      <SectionOne />
      </main>
  );
};

export default Page;





/*
'use client';
import React, { useState } from 'react';

interface TableProps {
  data: { name: string; sum: number }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.sum}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Generate Numbers and Calculate
    </button>
  );
};

const Home: React.FC = () => {
  const [tableData, setTableData] = useState<{ name: string; sum: number }[]>([]);

  const handleClick = async () => {
    // Call Flask API to get data
    const response = await fetch('/api/generateNumbers');
    const data = await response.json();
    setTableData(data);
  };

  return (
    <div>
      <Button onClick={handleClick} />
      <Table data={tableData} />
    </div>
  );
};

export default Home;

*/