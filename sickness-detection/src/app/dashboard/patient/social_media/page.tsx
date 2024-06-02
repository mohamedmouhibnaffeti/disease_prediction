"use client"
import PatientSideBarDash from "@/components/PatientSideBarDash"
import PatientNavBarDash from "@/components/PatientNavBarDash"
import { useState } from "react"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import DashLikeCard from "@/components/DashLikeCard"
import DashCommentCard from "@/components/DashCommentCard"
import DashPostCardDetails from "@/components/DashPostCardDetails"
import withAuth from "@/components/HOC/AuthHOC"

const PatientSocialStats = () => {
    const [requestLoading, setRequestLoading] = useState(false)
    return (
        <>
            <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <PatientSideBarDash /> 
                <div className="flex flex-col">
                    <PatientNavBarDash />
                    <main className="flex-1 p-4 md:p-6">
                    {
                        true 
                        ?
                        <div className="grid h-screen place-content-center bg-white px-4">
                            <div className="text-center">
                                <h1 className="text-9xl font-black text-gray-200">SORRY</h1>

                                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                                <p className="mt-4 text-gray-500">We're currently working on this page.</p>

                                <a
                                href="/"
                                className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                                >
                                Go Back Home
                                </a>
                            </div>
                        </div>
                        :
                        (!requestLoading?
                        (
                            200 === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2">
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-6"> Likes </h1>
                                    <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-2">
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                    </div>
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-6"> Comments </h1>
                                    <div className="grid lg:grid-cols-3 gap-2">
                                        <DashCommentCard />
                                    </div>
                                </div>
                                <DashPostCardDetails />
                            </>
                            :
                            <ErrorFetching />
                        )
                        :
                        <div className="w-full h-full flex justify-center items-center">
                            <MainLoader />
                        </div>)
                    }
                    </main>
                </div>
            </div>
        </>
    )
}

export default withAuth(PatientSocialStats, ["patient"])