export default function CommentItemDashCard() {
    return(
        <div className="w-full flex gap-2 px-2 py-1 border-b border-b-slate-700/50">
            <div className="border border-sickness-border rounded-full p-1 text-sm bg-teal-500 text-white w-fit h-fit">
                <p className="uppercase"> MN </p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
                <p className="text-sickness-primaryText font-semibold text-sm"> Mouhib Naffeti </p>
                <p className="text-sickness-gray font-medium text-sm">Le lorem ipsum est, en imprimerie, une suite de me Lorem ipsum ou Lipsum. </p>
            </div>
        </div>
    )
}