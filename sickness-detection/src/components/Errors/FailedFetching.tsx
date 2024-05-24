import { XIcon } from "lucide-react"
export default function ErrorFetching (){
    return(
        <div className="w-full flex flex-col h-full text-red-500 gap-2 justify-center items-center">
            <div className="flex justify-center items-center p-4 bg-red-500 rounded-full">
                <XIcon className="w-36 h-36 text-white"/>
            </div>
            <p className="text-lg font-semibold">Sorry</p>
            <p className="text-center text-sm"> Error fetching data from database, please try again later </p>
        </div>
    )
}