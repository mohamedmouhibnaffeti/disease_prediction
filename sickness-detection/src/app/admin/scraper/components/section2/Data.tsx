import React from "react";

const Data: React.FC = () => {
  return (
    <div className="pt-8 pr-8">
      <h2 className="h-9 text-xl font-bold my-2">Data</h2>
      <div className="flex flex-row sm:flex-row justify-between items-center">
        <div>
          <p className="my-4">data collected :</p>
          <p>data cleared :</p>
        </div>
        <div>
          <button className="flex mt-6 w-full items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2 px-5"> Clear Data </button>
        </div>
      </div>
    </div>
  );
};

export default Data;
