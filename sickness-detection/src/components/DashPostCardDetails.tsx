"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { MessageSquareText, ThumbsUpIcon, X } from "lucide-react"
import CommentItemDashCard from "./CommentItemDashCard"
export default function DashPostCardDetails(){
    return(
        <Dialog open={false} >
            <DialogContent className='w-full flex justify-center flex-col'>
                <DialogHeader className='w-full flex justify-center'>
                    <div className="self-end"  >
                        <X className="cursor-pointer hover:rotate-90 transition delay-100 ease-linear"/>
                    </div>
                    <DialogTitle className='w-full flex justify-center -translate-y-4'>
                        Post Details
                    </DialogTitle>
                    <DialogDescription className='flex gap-3 items-center'>
                        <div className="border border-sickness-border rounded-full p-2 text-lg bg-teal-500 text-white w-fit h-fit">
                            <p className="uppercase"> MN </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sickness-primaryText font-semibold text-base"> Mouhib Naffeti </p>
                            <p className="text-sickness-gray font-semibold text-sm"> Cardiologist </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className="mx-2 my-2 border border-slate-700/50 rounded-sm shadow-sm py-2 bg-gray-200/70 font-medium">
                    <p className="px-2 text-sm">
                        Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu&apos;il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.
                    </p>
                    <div className="w-full h-[1px] bg-slate-700/50 mt-3" />
                    <div className="w-full justify-between flex gap-2 mt-2 px-2">
                        <div className="flex gap-1 text-slate-800 px-2 py-1 bg-slate-700/20 rounded-sm shadow-sm cursor-default">
                            <ThumbsUpIcon className="w-[1.2rem] h-[1.2rem] translate-y-" /> <span className="font-semibold text-sm"> 120 </span>
                        </div>
                        <div className="flex gap-1 text-slate-800 px-2 py-1 bg-slate-700/20 rounded-sm shadow-sm cursor-default">
                        <span className="font-semibold text-sm"> 120 </span> <MessageSquareText className="w-[1.2rem] h-[1.2rem] translate-y-" />
                        </div>
                    </div>
                </div>
                <p className="text-sm text-sickness-gray font-semibold mx-2 -mt-3"> Comments </p>
                <div className="rounded-sm mx-2 overflow-y-scroll bg-gray-200/70 border border-slate-700/50 border-b-0 h-44 -mt-3">
                    <CommentItemDashCard />
                    <CommentItemDashCard />
                    <CommentItemDashCard />
                    <CommentItemDashCard />
                    <CommentItemDashCard />
                    <CommentItemDashCard />
                </div>
            </DialogContent>
        </Dialog>
    )
}