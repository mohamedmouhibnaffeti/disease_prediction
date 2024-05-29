import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Carousel from "./Carousel"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import { useState, useEffect } from "react"
import { fetchDoctorImages, openDrawer, setSelectedDoctor, acceptDoctor, changeDoctorState } from "@/Store/admin/AdminSlice"
import MainLoader from "./Loaders/MainLoader"
import { useToast } from "./ui/use-toast"
import SmallWhiteLoader from "./Loaders/WhiteButtonLoader"

const ManageDoctorsDrawer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedDoctor, drawerOpen } = useSelector((state: RootState) => state.Admin)
  const [loading, setLoading] = useState<boolean>(false)
  const [accepting, setAccepting] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const fetchData = async() => {
    setLoading(true)
    const response = await dispatch(fetchDoctorImages())
    console.log(response)
    setData(response.payload)
    setLoading(false)
  }

  const {toast} = useToast()

  useEffect(()=>{
    if(selectedDoctor && drawerOpen){
      fetchData()
    }
  }, [selectedDoctor])
  console.log(data)
  const CloseDrawer = () => {
    dispatch(openDrawer(false))
    dispatch(setSelectedDoctor(null))
  }

  const AcceptDoctor = async() => {
    setAccepting(true)
    const response = await dispatch(changeDoctorState())
    setAccepting(false)
    if(response.payload.status === 200){
    toast({
        title: "Congratulations !",
        description: <p> Doctor accepted successfully.</p>,
        })
        CloseDrawer()
        window.location.reload()
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
        description: <p> Couldn't accept doctor, Please try again later. </p>,
        })
    }
}

  return (
    <Drawer open={drawerOpen} onClose={CloseDrawer} >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">ID Images</DrawerTitle>
            <DrawerDescription className="text-center">A list of identity images corresponding to the selected doctor.</DrawerDescription>
          </DrawerHeader>
            {
              !loading ?
                (
                  data && data.status === 200 ?
                    <Carousel data={data.images} />
                  :
                    <div className="w-full flex justify-center items-center mt-3">
                      <p className="text-sickness-primaryText text-xl font-semibold"> Sorry... </p>
                      <p className="font-semibold text-sickness-ashGray"> Couldn't fetch images for the selected doctor </p>
                    </div>
                )
              :
              <div className="w-full flex justify-center items-center">
                <MainLoader />
              </div>
            }
          <DrawerFooter>
            <Button onClick={AcceptDoctor} variant={`${accepting ? "loading" : "default"}`} disabled={accepting}>Accept { accepting && <SmallWhiteLoader /> } </Button>
            <DrawerClose asChild>
              <Button variant="outline" disabled={accepting} onClick={CloseDrawer}>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ManageDoctorsDrawer
