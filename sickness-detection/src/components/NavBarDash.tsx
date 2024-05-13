"use client"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { ApercuIcon } from "./SideBarDash"
import { FileIcon, HeartIcon, Settings2Icon, Clock, PlusIcon, MenuSquareIcon, MenuIcon, CreditCardIcon } from "lucide-react"

const ConditionalNavTitle = ({pathname}: {pathname: string}) => {
    return(
        <div className="md:-translate-x-0 -translate-x-4">
        {pathname === '/dashboard' ?
            <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                <div className="translate-y-[2px] font-dashfont"><ApercuIcon /></div>
                Aperçu
            </h1>
        :
        (
            pathname.startsWith('/dashboard/MesProjets') ?
            <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                <div className="translate-y-[2px]"><FileIcon /></div>
                Mes Projets
            </h1>
            :
            (
                pathname.startsWith('/dashboard/ProjetsSupportes') ?
                <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                    <div className="translate-y-[2px]"><HeartIcon /></div>
                    Projets Supportés
                </h1>
            :
                pathname.startsWith('/dashboard/Parametres') ?
                <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                    <div className="translate-y-[2px]"><Settings2Icon /></div>
                    Paramètres
                </h1>
            :
            (
                pathname.startsWith('/dashboard/Historique') ?
                <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                    <div className="translate-y-[2px]"><Clock /></div>
                    Historique
                </h1>
                :
                (
                    pathname.startsWith('/dashboard/Paiement') ?
                    <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                        <div className="translate-y-[2px]"><CreditCardIcon /></div>
                        Paiement
                    </h1>
                    :
                    ""
                )
            )
            
            )
        )
        }
        </div>
    )
}

const NavBarDash = () => {
    const Router = useRouter()
    const pathname = usePathname()

    return(
        <header className="flex h-14 lg:h-[60px] items-center border-b border-sickness-border md:px-0 px-6 lg:px-8 justify-between z-20 bg-gray-200/40">
            <div className="w-full flex justify-between px-6 pr-2 items-center">
                <div className="flex sm:gap-8 gap-2 items-center">
                    <MenuIcon className={`md:hidden flex cursor-pointer `} />
                </div>
            </div>
        </header>
    )
}
export default NavBarDash 