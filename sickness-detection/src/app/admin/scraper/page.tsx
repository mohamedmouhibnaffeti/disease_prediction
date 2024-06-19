'use client'
import { useCallback, useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import { PatientDashMainPageData } from "@/Store/patient/PatientSlice"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import React, { useEffect, useState } from 'react';
import { AddWebDialog } from './components/AddWebDialog';
import { io } from 'socket.io-client';
//import Scraper from './components/Scraper';
import withAuth from "@/components/HOC/AuthHOC"
import Item from "./components/Scraper"
import { useRouter } from "next/navigation"

interface RunningStatus {
  running: boolean;
}


interface DataProps {
  name: string;
  symptoms: string;
}


// Scraper Component
const Scraper: React.FC<{ onSelect: (websiteName: string, selected: boolean) => void }> = ({ onSelect }) => {
  const [data, setData] = useState<string[] | null>(null);

  const fetchDataFromBackend = async (): Promise<string[] | null> => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/getWebsites');
      if (!response.ok) throw new Error('Failed to fetch data from the backend');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchDataFromBackend();
      setData(newData);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        data.map((item, index) => (
          <Item key={index} websiteName={item} onSelect={onSelect} />
        ))
      ) : (
        <center><p>Loading...</p></center>
      )}
    </div>
  );
};

const Page: React.FC = () => {
  const [requestLoading, setRequestLoading] = useState(false)
  const [mainData, setMainData] = useState<any>()
  const dispatch = useDispatch<AppDispatch>()
  const fetchData = async () => {
      setRequestLoading(true)
      const response = await dispatch(PatientDashMainPageData({patientID: "6651af539b6651ea68e82453"}))
      setMainData(response.payload)
      setRequestLoading(false)
  }
  useLayoutEffect(()=>{
  }, [])
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [url, setUrl] = useState<string | undefined>();
  const [newData, setNewData] = useState<DataProps[]>([]);
  const [totalNewData, setTotalNewData] = useState<number>(0);
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('newdata', (data: DataProps) => {
      setNewData((prevNewData) => [...prevNewData, data]);
      setTotalNewData((prevTotal) => prevTotal + 1);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const getRunningStatus = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/running-status');
      const data: RunningStatus = await response.json();
      return data.running;
    } catch (error) {
      console.log('Error fetching running status:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    const fetchRunningStatus = async () => {
      const running = await getRunningStatus();
      setIsScraping(running);
    };
    fetchRunningStatus();
  }, [getRunningStatus]);


  const handleStartScraping = async () => {
    if (selectedWebsites.length === 0) {
      alert('Please select websites before starting scraping.');
      return;
    }
  
    try {
      setIsScraping(true);
      const response = await fetch('http://127.0.0.1:5000/api/start-scraping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websites: selectedWebsites }),
      });
      
      if (!response.ok) throw new Error('Failed to start scraping');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setIsScraping(false);
    } catch (error) {
      console.error('Error starting scraping:', error);
    }
  };
  
  

  const handleStopScraping = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/stop-scraping', { method: 'POST' });
      const running = await getRunningStatus();
      setIsScraping(running);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error stopping scraping:', error);
    }
  };

  const handleSelectWebsite = (websiteName: string, selected: boolean) => {
    setSelectedWebsites((prevSelected) =>
      selected ? [...prevSelected, websiteName] : prevSelected.filter((name) => name !== websiteName)
    );
  };

  const Router = useRouter()

  return (
    <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <AdminSideBarDash /> 
                <div className="flex flex-col">
                    <AdminNavBarDash />
                    <main className="flex-1 p-4 md:p-6 main-bg">
                    {
                        !requestLoading?
                        (
                            /*mainData && mainData.status */ 200 === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col h-4/5 w-full lg:flex-row-reverse mt-3">
                                {/* SectionTwo */}
                                <div className="p-4 w-full lg:w-1/3 sm:ml-2">
                                <div className="w-full">
                                  <h2 className="text-xl font-bold mb-2">Data Operations</h2>
                                  <div className="flex flex-col justify-between sm:flex-row gap-2">
                                    {isScraping ? (
                                      <button
                                        className="flex mt-6 w-full items-center justify-center bg-red-700 border-2 border-red-900 text-white p-3 rounded-md hover:bg-red-800 gap-2"
                                        onClick={handleStopScraping}
                                      >
                                        Stop Scraping
                                      </button>
                                    ) : (
                                      <button
                                        className="flex mt-6 w-full items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2"
                                        onClick={handleStartScraping}
                                      >
                                        Start Scraping
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Websites Section */}
                                <div className="h-3/5">
                                  <div className="flex justify-between items-center my-5">
                                    <h2 className="h-9 text-xl font-bold my-4">Websites</h2>
                                  </div>
                                  <div className="h-5/6 overflow-y-auto p-2 border border-black">
                                    <Scraper onSelect={handleSelectWebsite} />
                                  </div>
                                </div>

                                {/* Data Section */}
                                <div className="pt-8 pr-8">
                                  <h2 className="h-9 text-xl font-bold my-2">Data</h2>
                                  <div className="flex flex-row sm:flex-row justify-between items-center">
                                    <div>
                                      <p className="my-4">Data collected: {totalNewData}</p>
                                    </div>
                                    <div>
                                      <button className="flex mt-6 w-full items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2 px-5" onClick={()=>Router.push("/admin/file-insert")}>
                                        Clear Data
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* New Data Section */}
                              <div className="w-full lg:w-2/3 p-4 border border-black sm:mr-2 bg-white">
                                <div className="flex flex-row h-10 mr-4">
                                  <div className="w-1/4 border-2 border-black flex justify-center items-center">#</div>
                                  <div className="w-1/4 border-2 border-black flex justify-center items-center">Sickness Name</div>
                                  <div className="w-1/2 border-2 border-black flex justify-center items-center">Symptoms</div>
                                </div>
                                <div className="h-[95%] overflow-y-scroll">
                                  {newData.map((data, index) => (
                                    <div key={index} className="flex flex-row">
                                      <div className="w-1/4 border border-black flex justify-center items-center">{index + 1}</div>
                                      <div className="w-1/4 border border-black flex justify-center items-center">{data.name}</div>
                                      <div className="w-1/2 border border-black flex justify-center items-center">{data.symptoms}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                                </div>
                            </>
                            :
                            <ErrorFetching />
                        )
                        :
                        <div className="w-full h-full flex justify-center items-center">
                            <MainLoader />
                        </div>
                    }
                    </main>
                </div>
            </div>
  );
};

export default withAuth(Page, ["admin"]);
