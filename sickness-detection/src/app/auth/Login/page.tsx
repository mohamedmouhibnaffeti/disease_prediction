import { LogInIcon } from "lucide-react"

export default () => {
    return(
        <main className="w-screen h-screen flex items-center justify-center px-8 py-4">
            <div className="w-[32rem] px-8 py-4 rounded-md shadow-lg border-sickness-border border bg-white flex flex-col gap-4 items-center">
                <h1 className="font-semibold text-sickness-primaryText text-3xl"> Welcome back! </h1>
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Email </span>
                    <input type="text" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="example@gmail.com" />
                </div>
                <div className="w-full mt-4">
                    <span className="text-sickness-gray text-lg"> Password </span>
                    <input type="password" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                </div>
                <button className="mt-4 w-full rounded-md text-white bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-1"> Login <LogInIcon /> </button>
                <p className="text-sickness-gray text-sm self-start mt-2"> Don't have an account? <a href="/auth/Signup" className="text-sickness-primaryText hover:underline font-semibold cursor-pointer"> Create account! </a> </p>
            </div>
        </main>
    )
}