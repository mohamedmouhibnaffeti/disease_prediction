import Image from "next/image"
import postimage from "./Images/360_F_714124132_vISSBYPjI9W1IIBoR2YccJaFZTvVDd76.webp"
import { ChevronDown, HeartIcon, MessageCircleMore } from "lucide-react"
import CommentCard from "./CommentCard"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
export default function PostCard() {
    return(
        <div className="md:w-[30rem] w-full px-4 py-4 flex flex-col border border-sickess-border bg-white shadow-sm rounded-xl gap-3 max-h-[800px] overflow-y-auto">
            <div className="flex gap-2">
                <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit">
                    <p className="uppercase"> MN </p>
                </div>
                <div className="flex flex-col">
                    <p className="text-lg text-sickness-primaryText font-semibold"> Mouhib Naffeti </p>
                    <p className="font-medium text-sickness-gray text-sm"> Cardiologist </p>
                </div>
                <p className="text-sm text-sickness-ashGray translate-y-1"> 1 w. ago </p>
            </div>
            <p className="max-w-full break-words text-sm text-black font-mono leading-5 pl-4">
            </p>
            <Image src={postimage} alt="" className="w-full object-cover h-48 rounded-md shadow-sm" />
            <div className="w-full flex justify-between gap-2 mt-1">
                <div className="flex gap-4">
                    <p className="flex gap-1"> <HeartIcon className="w-7 h-7 text-red-500 fill-red-500" /> <span className="text-base text-slate-700 font-semibold translate-y-1"> 1.2K </span> </p>
                    <p className="flex -translate-y-[0.1rem]"> <MessageCircleMore className="w-8 h-8 text-white fill-blue-500" /> <span className="text-base text-slate-700 font-semibold translate-y-[0.4rem]"> 200 </span> </p>
                </div>
                <button className="text-sickness-ashGray border bg-slate-400/10 leading-5 rounded-full pl-2 text-sm py-2 w-full flex justify-start -translate-y-[0.1rem] hover:bg-slate-400/15 transition delay-75 ease-in-out"> Write a comment... </button>
            </div>
            <div className="w-full h-[1px] bg-sickness-border" />
            <CommentCard />
            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>View All Comments</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col gap-2">
                        <CommentCard /> 
                        <CommentCard /> 
                        <CommentCard /> 
                        <CommentCard /> 
                        <CommentCard /> 
                        <CommentCard />    
                    </div>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
    )
}