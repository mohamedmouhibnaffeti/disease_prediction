import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from 'react';


export function AddWebDialog() {

  const handleUpload = () => {
    const fileInput = document.getElementById('scraper-file') as HTMLInputElement;
    const file = fileInput.files[0];
    const className = (document.getElementById('class-name') as HTMLInputElement).value;
    const classFunction = (document.getElementById('class-function') as HTMLInputElement).value;

    if (file && className && classFunction) {
        if (file.name.endsWith('.py')) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('className', className);
            formData.append('classFunction', classFunction);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload_scraper', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log('File uploaded successfully');
                    alert(xhr.responseText);
                } else {
                    console.error('Error uploading file');
                    alert('Error: ' + xhr.responseText);
                }
            };
            xhr.send(formData);
        } else {
            alert('Invalid file type. Please upload a .py file.');
        }
    } else {
        alert('Please select a file and provide a class name and function.');
    }
};


  return (
    <Dialog>
      <DialogTrigger className="bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mr-2">
        Add Website
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Website</DialogTitle>
          <>
            <input type="text" id="class-name" placeholder="Enter class name" />
            <input type="text" id="class-function" placeholder="Enter class function" />
            <input type="file" id="scraper-file" name="scraper-file" />
            <button id="upload-button" onClick={handleUpload}>Upload Scraper File</button>
        </>
          <form>
      <button className="bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mx-2">Save</button>
      <button className="border border-black hover:bg-slate-500 font-bold py-2 px-4 rounded mx-2">Cancel</button>
    </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

  


