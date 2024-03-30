"use client"
import Doc from "./Doctor/Doc"
import Patient from "./Patient/Patient"
import Role from "./Role"
import { RootState } from "@/Store/store"
import { useSelector } from "react-redux"

export default () => {
    const CurrentSignupPage = useSelector((state: RootState) => state.Authentication.currentSignUpPage)
    return(
        <div className="w-screen h-screen flex justify-center items-center py-4 px-8">
            {
                CurrentSignupPage === 'role'
                ?
                <Role />
                :
                (
                    CurrentSignupPage === 'doctor'
                    ?
                    <Doc />
                    :
                    (
                        CurrentSignupPage === 'patient'
                        ?
                        <Patient />
                        :
                        ""
                    )
                )
            }
        </div>
    )
}