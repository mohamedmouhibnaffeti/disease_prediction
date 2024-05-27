export default function DashLikeCard() {
    return(
        <div className="flex justify-between gap-2 rounded-md shadow-md border border-sickness-border w-full h-fit pl-4 pr-2">
            <p className="py-2">
                You liked a post from <span> Mouhib Naffeti </span>
            </p>
            
            <div className="self-center flex justify-center items-center text-gray-200 border border-teal-500 bg-teal-500 px-2 py-1 rounded-sm text-sm font-semibold cursor-pointer hover:text-teal-500 hover:bg-white transition ease-in-out delay-100">
                View Post
            </div>
        </div>
    )
}