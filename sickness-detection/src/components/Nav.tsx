"use client"
import Image from "next/image"
import Logo from "./Images/Logo.png"
import { LogIn } from "lucide-react"
import { usePathname } from "next/navigation"

export default () => {
    const pathname = usePathname()
    if(pathname.startsWith("/admin")){
        return null
    }
    return (
        <div className="fixed z-50 top-0 h-[5rem] bg-white shadow-md w-full">
            <div className="w-full h-full flex justify-between items-center px-8">
                <Image src={Logo} alt="" className="w-[170px]" />
                <button className="flex justify-center items-center font-semibold text-white bg-sickness-mayaBlue px-2 py-2 rounded-md"> Login <LogIn /> </button>
            </div>
        </div>
    )
}