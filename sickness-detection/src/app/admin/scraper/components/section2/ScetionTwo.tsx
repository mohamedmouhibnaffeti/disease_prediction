import React from "react";
import DataOperation from "./DataOperation";
import WebSites from "./WebSites";
import Data from "./Data";

const SectionTwo: React.FC = () => {
  return (
    <div className="p-4 w-full lg:w-1/3 sm:ml-2">
      <DataOperation />
      <WebSites />
      <Data />
    </div>
  );
};

export default SectionTwo;
