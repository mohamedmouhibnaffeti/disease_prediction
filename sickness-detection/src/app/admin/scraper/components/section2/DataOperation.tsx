"use client";
import React, { useState } from 'react';

const DataOperation: React.FC = () => {
  const [isScraping, setIsScraping] = useState(true);
  const [url, setUrl] = useState<string>()
  const startScraping = async () => {
    setIsScraping(false)
    const response = await fetch('http://127.0.0.1:5000/api/start-scraping', {
      method: 'POST'
    })
    const blob = await response.blob()
    const urlRes = window.URL.createObjectURL(blob)
    setUrl(urlRes)
    setIsScraping(true)
    
  }

  const stopScraping = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/stop-scraping', {
      method: 'POST'
    })
    setIsScraping(true)
  }
  return (
    <div className='w-full '>
      <h2 className='text-xl font-bold mb-2'>Data Operations</h2>
      <div className='flex flex-col justify-between sm:flex-row gap-2 '>
        { isScraping && <button className="flex mt-6 w-full items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2" onClick={startScraping} >
          Start Scraping
        </button>}
        { !isScraping && <button className="flex mt-6 w-full items-center justify-center bg-red-700 border-2 border-red-900 text-white p-3 rounded-md hover:bg-red-800 gap-2" onClick={stopScraping}>
          Stop Scraping
        </button>}
        { url && <a href={url} download="ResultScraping.csv" target="_blank" rel="noopener noreferrer" className="flex mt-6 w-full items-center justify-center bg-green-600 border-2 border-green-600 text-white p-3 rounded-md hover:bg-green-700 gap-2"> <button> Download Result  </button> </a> }
      </div>
    </div>
  );
};

export default DataOperation;

/*
<button
          className={`bg-${isScraping ? 'red' : 'blue'}-500 hover:bg-${isScraping ? 'red' : 'blue'}-700 text-white font-bold py-2 px-4 mx-2 rounded mt-2`}
          onClick={handleClick}
        >
          {isScraping ? 'Stop Scraping' : 'Start Scraping'}
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded mt-2'
        >
          Clear Data
        </button>
*/