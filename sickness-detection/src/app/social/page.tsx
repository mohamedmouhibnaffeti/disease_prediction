import PostCard from "@/components/PostCard";

export default function Social(){
    return(
        <>
            {
                false ?
                <div className="w-full min-h-screen flex justify-center items-start bg-sickness-social">
                    <div className="md:px-8 py-4 px-4 border-sickness-border bo rounded-sm grid grid-cols-1 mt-[6rem] gap-4">
                        <PostCard />
                        <PostCard />
                    </div>
                </div>
                :
                <div className="grid h-screen place-content-center bg-white px-4">
                    <div className="text-center">
                        <h1 className="text-9xl font-black text-gray-200">SORRY</h1>

                        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                        <p className="mt-4 text-gray-500">We&apos;re currently working on this page.</p>

                        <a
                        href="/"
                        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                        >
                        Go Back Home
                        </a>
                    </div>
                </div>
            }
        </>
    )
}