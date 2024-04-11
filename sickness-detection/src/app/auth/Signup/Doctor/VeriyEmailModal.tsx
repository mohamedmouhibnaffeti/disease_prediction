import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { BadgeCheckIcon, BanIcon } from "lucide-react";
import ReactCodeInput from "react-verification-code-input";

export default function VerifyEmail() {
    return(
        <AlertDialog open={true}>
            <AlertDialogContent className='w-full flex justify-center flex-col'>
                <AlertDialogHeader className='w-full flex justify-center'>
                    <AlertDialogTitle className='w-full flex justify-center'>
                        Verify your inbox!
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-sm text-center'>
                        We've sent you an email containing a verification code which will expire in <span className='text-settaPrimary font-semibold'> {60} seconds </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='w-full flex justify-center items-center flex-col'>
                    <ReactCodeInput />
                    { "" && <p className="text-sm text-red-500 mt-2"> {""} </p> }
                </div>
                <div className='flex justify-between'>    
                    <button className={`w-fit px-4 rounded-md text-sickness-primary hover:text-white bg-none border-2 border-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`} disabled={false} > Annuler&nbsp;<BanIcon /> </button>
                    <button className={`w-fit px-4 rounded-md text-white ${false ? "bg-sickness-primary/70" : "bg-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} border-2 border-sickness-primary transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`} disabled={false || false}> Vérifier&nbsp;<BadgeCheckIcon /> </button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}