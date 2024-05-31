export default function CommentCard(){
    return(
        <div className="md:w-5/6 w-full flex gap-2">
            <div className="border border-sickness-border rounded-full font-semibold p-1 text-sm bg-sickness-orange text-white w-fit h-fit">
                <p className="uppercase"> MN </p>
            </div>
            <div className="flex flex-col px-2 py-1 bg-slate-400/15 rounded-md border">
                <p className="text-slate-700 text-xs font-semibold">
                    Mouhib Naffeti
                </p>
                <p className="text-xs text-gray-600 break-words mt-1 "> 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
                </p>
            </div>
        </div>
    )
}

/*

<div className="w-5/6 bg-slate-400/15 rounded-md border py-1 px-2">
    <div className="flex gap-2 items-center">
        <div className="border border-sickness-border rounded-full font-semibold p-1 text-sm bg-sickness-orange text-white w-fit h-fit">
            <p className="uppercase"> MN </p>
        </div>
        <p className="text-slate-700 text-xs  -translate-y-1 font-semibold">
            Mouhib Naffeti
        </p>
    </div>
    <p className="text-xs text-gray-600 break-words mt-2 pl-6"> 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
    </p>
</div>

*/