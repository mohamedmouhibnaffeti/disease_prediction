'use client';
import React, { useState } from 'react';

// Define interfaces for types
interface ItemProps {
  websiteName: string;
  onSelect: (websiteName: string, selected: boolean) => void;
}

// Item Component
const Item: React.FC<ItemProps> = React.memo(({ websiteName, onSelect }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelect(websiteName, !isChecked);
  };

  return (
    <div className="flex justify-between items-center border border-black border-3 rounded-lg mb-2 p-2 bg-white">
      <div className="flex items-center justify-between w-full">
        <label className="font-bold select-none text-xl">{websiteName}</label>
        <div className="dark:bg-black/10">
          <label className="text-white">
            <input
              className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-6 h-6 ml-auto"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
});

// Adding display name to the component
Item.displayName = 'Item';

export default Item;
