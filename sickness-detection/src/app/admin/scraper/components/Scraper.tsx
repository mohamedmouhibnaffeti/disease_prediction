// pages/index.tsx

import { useEffect, useState } from 'react';
import Item from './Item';

const fetchDataFromBackend = async (): Promise<any[] | null> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/dataget');
    if (!response.ok) {
      throw new Error('Failed to fetch data from the backend');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
    return null;
  }
};

const Scraper: React.FC = () => {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchDataFromBackend();
      setData(newData);
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      {data ? (
        <>
          {data.map((item: any, index: number) => (
            <Item websiteName={item}/>
          ))}
        </>
      ) : (
        <center><p>Loading...</p></center>
      )}
    </div>
  );
};

export default Scraper;
