export default function DashCommentCard() {
    return(
        <div className="flex flex-col rounded-md shadow-md border border-sickness-border w-full h-fit py-2">
            <div className="flex justify-between gap-2 pl-4 pr-2">
                <p className="">
                    You Commented on a post from <span> Mouhib Naffeti </span>
                </p>
                <div className="self-center flex justify-center items-center text-gray-200 border border-teal-500 bg-teal-500 px-2 py-1 rounded-sm text-sm font-semibold cursor-pointer hover:text-teal-500 hover:bg-white transition ease-in-out delay-100">
                    View Post
                </div>
            </div>
            <div className="w-full h-[1px] bg-sickness-border mt-2" />
            <p className="px-4 mt-2 text-sm font-medium text-sickness-gray">
                I love your post
            </p>
        </div>
    )
}