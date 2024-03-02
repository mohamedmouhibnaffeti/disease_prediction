// SimpleForm.tsx
"use client";
import React from "react";

const AddWebsiteForm: React.FC = () => {
  return (
    <form>
      <button className="bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mx-2">Save</button>
      <button className="border border-black hover:bg-slate-500 font-bold py-2 px-4 rounded mx-2">Cancel</button>
    </form>
  );
};

export default AddWebsiteForm;
