"use client"
import Image from "next/image"
import Logo from "./Images/Logo.png"
import { LogIn } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import useAuth from "@/lib/Hooks/useAuth"
import { useEffect, useLayoutEffect, useState } from "react"
import AvatarDropdown from "./AvatarDropdown"

export default () => {
    const role = useAuth()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    useLayoutEffect(()=>{
        const userString = localStorage.getItem("user") || ""
        const userObject = JSON.parse(userString)
        if(userObject){
            setUser(userObject)
        }
        setLoading(false)
    }, [])
    const Router = useRouter()
    const pathname = usePathname()
    if(pathname.startsWith("/admin") || pathname.startsWith("/dashboard")){
        return null
    }
    return (
        <div className="fixed z-50 top-0 h-[5rem] bg-white shadow-md w-full">
            <div className="w-full h-full flex justify-between items-center px-8">
                <div className="flex gap-3 justify-center items-center">
                    <Image src={Logo} alt="" className="w-[170px]" />
                    <a href="/symptoms-checker" className={`font-bold ${pathname.startsWith("/symptoms-checker") ? "text-sickness-primary hover:text-sickness-primary/80" : "text-black hover:text-black/80" } transition delay-75 ease-in-out`}> Disease Prediction </a>
                </div>
                {
                    !loading 
                    &&
                    (user ?
                        <AvatarDropdown user={user} role={role || ""} />
                    :
                        <button className="flex justify-center items-center font-semibold text-white bg-sickness-mayaBlue px-2 py-2 rounded-md" onClick={()=>Router.push('/auth/Login')}> Login <LogIn /> </button>)
                }
            </div>
        </div>
    )
}