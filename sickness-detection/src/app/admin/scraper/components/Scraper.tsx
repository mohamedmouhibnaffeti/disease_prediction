import { useEffect, useState } from 'react';
import { ModifyWebsite } from "./ModifyWebsite";

interface ItemProps {
  websiteName: string;
}

const Item: React.FC<ItemProps> = ({ websiteName }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const handleDelete = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/delete-scraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ websiteName })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Logging the response
      // Handle success, e.g., show success message to the user
    } catch (error) {
      console.error('Error deleting scraper:', error);
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div className="flex justify-between items-center border border-black border-3 rounded-lg mb-2 p-2 bg-white">
      <div className="flex items-center">
        <label className="relative block cursor-pointer font-normal select-none w-7 h-7 rounded-sm bg-gray-300 hover:bg-gray-200 mr-2">
          <input
            type="checkbox"
            checked={isChecked}
            className="opacity-0 cursor-pointer w-0 h-0 peer"
            onChange={handleCheckboxChange}
          />
          <div className="absolute top-1/2 left-1 w-5 h-0.5 bg-gray-800 transform -translate-y-1/2 transition-all duration-700 ease-out-cubic"></div>
          <div className="absolute top-1/2 left-1 w-5 h-0.5 bg-gray-800 transform -translate-y-1/2 peer-checked:rotate-90 transition-all duration-700 ease-out-cubic"></div>
        </label>
        <label className="font-bold select-none">
          {websiteName}
        </label>
      </div>
      <div className="flex">
        <button className="bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ModifyWebsite />
      </div>
    </div>
  );
};






const Scraper: React.FC = () => {
  const [data, setData] = useState<any[] | null>(null);

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
            <Item websiteName={item} key={index}/>
          ))}
        </>
      ) : (
        <center><p>Loading...</p></center>
      )}
    </div>
  );
};

export default Scraper;
