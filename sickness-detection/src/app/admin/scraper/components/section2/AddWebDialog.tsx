import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import F from "./AddWebsiteForm";

export function AddWebDialog() {
  return (
    <Dialog>
      <DialogTrigger className="bg-[#344966] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mr-2">
        Add Website
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Website</DialogTitle>
          <F />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

  