import MainLoader from "./MainLoader";

export default function FullScreenLoader() {
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <MainLoader />
        </div>
    )
}