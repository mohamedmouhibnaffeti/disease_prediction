'use client';
import React, { useEffect, useState } from 'react';
import { AddWebDialog } from './components/AddWebDialog';
import { io } from 'socket.io-client';
import Navbar from './components/navBar/NavBar';
import Scraper from './components/Scraper';
import App from './components/Buttons';

const Page: React.FC = () => {
  const [isScraping, setIsScraping] = useState(true);
  const [url, setUrl] = useState<string>();
  const [newData, setNewData] = useState<any[]>([]); 
  const [totalNewData, setTotalNewData] = useState<number>(0);

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('newdata', (Data: any) => {
      setNewData((prevNewData) => [...prevNewData, Data]);
      setTotalNewData(prevTotal => prevTotal + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


const getRunningStatus = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/running-status');
    const data = await response.json();
    return data.running;
  } catch (error) {
    console.error('Error fetching running status:', error);
    return false;
  }
};



  const startScraping = async () => {
    setIsScraping(false);
    const response = await fetch('http://127.0.0.1:5000/api/start-scraping', {
      method: 'POST'
    });
    const blob = await response.blob();
    const urlRes = window.URL.createObjectURL(blob);
    setUrl(urlRes);
    setIsScraping(true);
  };

const stopScraping = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/stop-scraping', {
      method: 'POST'
    });
    setIsScraping(true);
  };

  return (
    <main className="flex flex-col lg:h-screen p-4 main-bg"> 
    <Navbar />
      <div className='flex flex-col h-4/5 w-full lg:flex-row-reverse'>
        {/* SectionTwo */}
        <div className="p-4 w-full lg:w-1/3 sm:ml-2">
          {/* DataOperation */}
          <div className='w-full'>
            <h2 className='text-xl font-bold mb-2'>Data Operations</h2>
            <div className='flex flex-col justify-between sm:flex-row gap-2'>
            <App />
            <button className="flex mt-6 w-full items-center justify-center bg-red-700 border-2 border-red-900 text-white p-3 rounded-md hover:bg-red-800 gap-2" onClick={stopScraping}>
                  Stop Scraping
                </button>

                
              {isScraping && 
                <button className="flex mt-6 w-full items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2" onClick={startScraping}>
                  Start Scraping
                </button>
              }
              {!isScraping && 
                <button className="flex mt-6 w-full items-center justify-center bg-red-700 border-2 border-red-900 text-white p-3 rounded-md hover:bg-red-800 gap-2" onClick={stopScraping}>
                  Stop Scraping
                </button>
              }
              {url && 
                <a href={url} download="ResultScraping.csv" target="_blank" rel="noopener noreferrer" className="flex mt-6 w-full items-center justify-center bg-green-600 border-2 border-green-600 text-white p-3 rounded-md hover:bg-green-700 gap-2">
                  <button>Download Result</button>
                </a>
              }
            </div>
          </div>

          {/* WebSites */}
          <div className="h-3/5">
            <div className="flex justify-between items-center my-5">
              <h2 className="h-9 text-xl font-bold my-4">Websites</h2>
              <AddWebDialog />
            </div>

            <div className="h-5/6 overflow-y-auto p-2 border border-black">
            <Scraper />
            </div>
          </div>

          {/* Data */}
          <div className="pt-8 pr-8">
            <h2 className="h-9 text-xl font-bold my-2">Data</h2>
            <div className="flex flex-row sm:flex-row justify-between items-center">
              <div>
                <p className="my-4">data collected : {totalNewData}</p>
              </div>
              <div>
                <button className="flex mt-6 w-full items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2 px-5">Clear Data</button>
              </div>
            </div>
          </div>
        </div>


{/* SectionOne */}
<div className="w-full lg:w-2/3 p-4 border border-black sm:mr-2 bg-white">
  <div className="flex flex-row h-10 mr-4">
    <div className="w-1/4 border-2 border-black flex justify-center items-center">#</div>
    <div className="w-1/4 border-2 border-black flex justify-center items-center">disease name</div>
    <div className="w-1/2 border-2 border-black flex justify-center items-center">symptoms</div>
  </div>
  <div className="h-[95%] overflow-y-scroll">
    {newData.map((Data, index) => (
      <div key={index} className="flex flex-row">
        <div className="w-1/4 border border-black flex justify-center items-center">{index + 1}</div>
        <div className="w-1/4 border border-black flex justify-center items-center">{Data.name}</div>
        <div className="w-1/2 border border-black flex justify-center items-center">{Data.symptoms}</div>
      </div>
    ))}
  </div>
</div>
      </div>
    </main>
  );
};

export default Page;