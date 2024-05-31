import PostCard from "@/components/PostCard";

export default function Social(){
    return(
        <div className="w-full min-h-screen flex justify-center items-start bg-sickness-social">
            <div className="md:px-8 py-4 px-4 border-sickness-border bo rounded-sm grid grid-cols-1 mt-[6rem] gap-4">
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
}