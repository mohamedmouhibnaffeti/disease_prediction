// SimpleForm.tsx
"use client";
import React, { useState } from "react";

const ModifyWebsiteForm: React.FC = () => {
  return (
    <form>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Save</button>
    <button className="border border-black hover:bg-slate-500 font-bold py-2 px-4 rounded mx-2">Cancel</button>
  </form>
  );
};

export default ModifyWebsiteForm;
