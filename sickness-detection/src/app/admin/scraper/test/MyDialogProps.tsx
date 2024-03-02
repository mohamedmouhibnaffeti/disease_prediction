/*// components/MyDialog.tsx
import React from 'react';

interface MyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyDialog: React.FC<MyDialogProps> = ({ isOpen, onClose }) => {
  return (
    <dialog open={isOpen}>
      <div className=' w-full h-full m-8' style={{ background: 'red', padding: '20px', borderRadius: '8px', }}>
        This is a full-sized dialog window with a red background and a 20px margin
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
};

export default MyDialog;
*/

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import F from "./F"


export function MyDialog() {
  return (
    <Dialog>
  <DialogTrigger className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <F />
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}
