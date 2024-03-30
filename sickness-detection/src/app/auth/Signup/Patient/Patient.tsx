"use client"
import { PlusSquare, UserPlusIcon } from 'lucide-react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContainerStyle = {
    height: '2.7rem',
    marginTop: '1rem'
}

const InputStyle = {
    width: '100%',
    height: '2.7rem',
    paddingLeft: '5rem',
};

const ButtonStyle = {
    width: '4rem',
    display: 'flex',
    justifyContent: 'center'
}

export default () => {
    return(
        <div className="w-[34rem] flex justify-center items-center flex-col border border-sickness-border bg-white px-8 py-4 gap-4 rounded-lg ">
            <h1 className="font-semibold text-sickness-primaryText text-3xl"> Create Account </h1>
            <div className="flex md:flex-row flex-col gap-2">
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Firstname </span>
                    <input type="text" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                </div>
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Lastname </span>
                    <input type="text" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                </div>
            </div>
            <div className="w-full">
                <span className="text-sickness-gray text-lg"> Email </span>
                <input type="text" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
            </div>
            <PhoneInput country='tn' inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle}/>
            <div className="w-full mt-4">
                    <span className="text-sickness-gray text-lg"> Password </span>
                    <input type="password" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
            </div>
            <div className="w-full mt-4">
                <span className="text-sickness-gray text-lg"> Confirm Password </span>
                <input type="password" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
            </div>
            <button className="mt-4 w-full rounded-md text-white bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2"> Create Account <UserPlusIcon className="h-5 w-5 -translate-y-[2px]" /> </button>
            <p className="text-sickness-gray text-sm self-start mt-2"> Already have an account? <a href="/auth/Login" className="text-sickness-primaryText hover:underline font-semibold cursor-pointer"> Login! </a> </p>
        </div>
    )
}