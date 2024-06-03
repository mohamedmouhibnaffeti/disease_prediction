"use client"
import SmallWhiteLoader from "@/components/Loaders/WhiteButtonLoader";
import Predict from "@/vendors/MachineLearning/Predict";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [pageLoading, setPageLoading] = useState(false)
  const Router = useRouter()
  useEffect(() => {
    return () => {
        setPageLoading(false);
    }
}, [])

  const handleCLick = () => {
    setPageLoading(prev => true)
    Router.push('/symptoms-checker')
  }
  return (
    <div className="flex flex-col">
      <div className="LandingImage h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-sickness-lavenderBlue md:text-7xl text-5xl font-extrabold">SymptoSense</h1>
          <p className="max-w-[27rem] text-center font-medium mt-8 leading-relaxed">Introducing SymptoSense - where symptom analysis meets predictive healthcare. Quickly analyze symptoms, receive personalized sickness predictions, and seamlessly book appointments. Your path to peace of mind starts here.</p>
          <button className={`${pageLoading ? "bg-sickness-primary/80" : "mayablue-glassmorphism"} px-8 text-white py-3 mt-8 flex justify-center items-center gap-2 rounded-lg`} disabled={pageLoading} onClick={handleCLick} > Check Symptoms {pageLoading && <SmallWhiteLoader />} </button>
          </div>
        <div className="flex-[0.4]" />
      </div>
    </div>
  );
}
