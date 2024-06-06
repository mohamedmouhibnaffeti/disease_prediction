"use client"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/Store/store"
import SmallWhiteLoader from "@/components/Loaders/WhiteButtonLoader"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useToast } from "@/components/ui/use-toast"
import { updatePatient } from "@/Store/patient/PatientSlice"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import { updateAdmin } from "@/Store/admin/AdminSlice"
import MainLoader from "@/components/Loaders/MainLoader"
import withAuth from "@/components/HOC/AuthHOC"
const ContainerStyle = {
    height: '3rem'
}

const InputStyle = {
    width: '100%',
    height: '3rem',
    paddingLeft: '5rem',
    
}

const ButtonStyle = {
    width: '4rem',
    display: 'flex',
    justifyContent: 'center',
    zIndex: "20"
}
const AdminProfile = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<{name: string, lastname: string, userID: string, phone: string, email: string}>({
        name: "",
        lastname: "",
        phone: "",
        userID: "",
        email: "",
    });
    const [error, setError] = useState<{name: string, lastname: string, phone: string}>({
        name: "",
        lastname: "",
        phone: "",
    });

    const [rendering, setRendering] = useState(true)

    useLayoutEffect(()=>{
        const userString = localStorage.getItem("user") || ""
        const userParsed = JSON.parse(userString)
        if(userParsed){
            setUser((prevUser: any) => ({
                name: userParsed.name,
                lastname: userParsed.lastname,
                email: userParsed.email,
                phone: userParsed.phone,
                userID: userParsed._id,
            }))
        }
        setRendering(false)
    },[])

    const handleFieldChange = ({val, name}: {val: string | number, name: keyof {name: string, lastname: string, userID: string, phone: string}}) => {
        setUser({...user, [name]: val})
    }

    const {toast} = useToast()
    const dispatch = useDispatch<AppDispatch>()

    const handleUpdatePatient = async() => {
        if(user.name.length < 4){
            setError({...error, name: "Name should be longer than 4 caracters."})
        }
        if(user.lastname.length < 4){
            setError({...error, lastname: "Lastname should be longer than 4 caracters."})
        }
        if(user.phone.length < 9){
            setError({...error, phone: "Phone number should be longer than 9 caracters"})
        }
        if((user.phone.length < 9) || (user.lastname.length < 4) || (user.name.length < 4)){
            return
        }
        setLoading(true)
        const response = await dispatch(updateAdmin({adminID: user.userID, name: user.name, lastname: user.lastname, phone: user.phone}))
        setLoading(false)
        if(response.payload.status === 204){
            toast({
                title: "Congratulations !",
                description: <p> You&apos;ve updated your profile successfully</p>,
              })
              
        }
        else if(response.payload.status === 400){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> { response.payload.message } </p>,
              })
        }
        else if(response.payload.status === 500){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> Couldn&apos;t update profile, Please try again later. </p>,
              })
        }
    }

    return (
        <>
            <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <AdminSideBarDash /> 
                <div className="flex flex-col">
                    <AdminNavBarDash />
                    <main className="w-full flex-1 flex p-4 sm:p-6">
                            {
                                !rendering ?
                                <>
                                    <div className="flex flex-col md:flex-[0.7] flex-1">
                                        <h1 className="text-xl font-semibold text-sickness-primaryText">Profile Settings</h1>
                                            <div className="flex md:flex-row flex-col gap-3 w-full mt-4">
                                                <div className="flex flex-col gap-1 w-full">
                                                    <p className="text-sm text-black font-medium">Name</p>
                                                    <input type="text" value={user.name} onChange={(e)=>{handleFieldChange({val: e.target.value, name: "name"}); setError({...error, name: ""})}} className="border-2 border-[#C5C5C5] rounded-md h-12 focus:outline-none focus:border-sickness-primary pl-2 "/>
                                                    <p className="text-sm text-red-500 self-center text-center">  </p>
                                                </div>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <p className="text-sm text-black font-medium">Lastname</p>
                                                    <input type="text" value={user.lastname} onChange={(e)=>{handleFieldChange({val: e.target.value, name: "lastname"}); setError({...error, name: ""})}}  className="border-2 border-[#C5C5C5] rounded-md h-12 focus:outline-none focus:border-sickness-primary pl-2 " />
                                                    <p className="text-sm text-red-500 self-center text-center">  </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full mt-4">
                                                <p className="text-sm text-black font-medium">Email Address</p>
                                                <input type="email" value={user.email} className="border-2 border-[#C5C5C5] bg-[#C5C5C5]/20 rounded-md h-12 focus:outline-none] pl-2 " readOnly={true} />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full mt-4 outline-none">
                                                <p className="text-sm text-black font-medium">Phone Number</p>
                                                <PhoneInput country='tn' value={user.phone} onChange={(e)=>{handleFieldChange({val: e, name: "phone"}); setError({...error, name: ""})}}  inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle} />
                                            {/* <input type="text" className="border-2 border-[#C5C5C5] rounded-md w-full h-12 focus:outline-none focus:border-sickness-primary pl-2 " /> */}
                                            <p className="text-sm text-red-500 self-center text-center"> {error.phone} </p>
                                            </div>
                                            <button onClick={handleUpdatePatient} className={`md:w-fit w-full px-8 py-2 ${loading ? "bg-sickness-primary/50" : "bg-sickness-primary/70 hover:bg-sickness-primary active:bg-sickness-primary/50"} transition delay-100 ease-in bg-settaPrimary text-white font-semibold flex gap-2 justify-center items-center rounded-md mt-6 self-end`} > Update {loading && <SmallWhiteLoader />} </button>
                                        </div>
                                    <div className="md:flex hidden md:flex-[0.3]"></div>
                                </>
                                :
                                <div className="w-full h-full flex justify-center items-center">
                                    <MainLoader />
                                </div>
                            }
                    </main>
                </div>
            </div>
        </>
    )
}

export default withAuth(AdminProfile, ["admin"])