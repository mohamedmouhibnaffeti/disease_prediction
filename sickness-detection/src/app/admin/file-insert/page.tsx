"use client"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import { PatientDashMainPageData } from "@/Store/patient/PatientSlice"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { Input } from "@/components/ui/input"
import { FileCheck, X, FileX, FileUp } from "lucide-react"
import DataLoader from "./Loading"
import { io } from "socket.io-client"

const socket = io('http://127.0.0.1:5000')

const File_Insert = () => {
    const [requestLoading, setRequestLoading] = useState(false)
    const [mainData, setMainData] = useState<any>()
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async () => {
        setRequestLoading(true)
        const response = await dispatch(PatientDashMainPageData({patientID: "6651af539b6651ea68e82453"}))
        setMainData(response.payload)
        setRequestLoading(false)
    }
    useLayoutEffect(()=>{
    }, [])
    //messaging server
    const [statusLoading, setLoadingStatus] = useState<Array<number>>([0])
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('message', (data)=>{
            console.log(data)
            setLoadingStatus([...statusLoading, data])
        })
    }, []);

    const RemoveLongChars = (str: string, maxlen: number) => {
        if(str.length <= maxlen){
            return str
        }
        const filteredstr = str.split('.');
        const extension: any = filteredstr.pop();
        const truncatedName = str.slice(0, maxlen - (extension.length + 1));

        return truncatedName + '....' + extension;
    }
    const [CSVErrorMessageShow, setCSVErrorMessageShow] = useState<boolean>(false)
    const [txtErrorMessageShow, settxtErrorMessageShow] = useState<boolean>(false)
    const CSVInputRef = useRef<any>()
    const txtInputRef = useRef<any>()
    // CSV files states
    const [CSVFiles, setCSVFiles] = useState<any>()
    let CSVFilesKeys: any = []
    if (CSVFiles){
        CSVFilesKeys = Object.keys(CSVFiles)
    }
    const removeCSVFile = (key: number) => {
        const updatedFiles = [...CSVFiles]
        updatedFiles.splice(key, 1)
        setCSVFiles(updatedFiles)
        setCSVErrorMessageShow(false)
    }
    // text files states 
    const [txtFiles, settxtFiles] = useState<any>()
    let txtFilesKeys: any = []
    if (txtFiles){
        txtFilesKeys = Object.keys(txtFiles)
    }
    const removetxtFile = (key: number) => {
        const updatedFiles = [...txtFiles]
        updatedFiles.splice(key, 1)
        settxtFiles(updatedFiles)
        settxtErrorMessageShow(false)
    }
    //preparing request
    const [LoaderTrue, setLoaderTrue] = useState<boolean>(false)
    const [CSVfileContent, setCSVFileContent] = useState<string>()
    const sendCSV = async () => {
        const formData = new FormData()
        CSVFilesKeys.map((key: number)=>{
            if(CSVFiles[key] instanceof File){
                formData.append(`file${key}`, CSVFiles[key])
            }
        })
        try{
            setLoaderTrue(true)
            const response = await fetch('http://127.0.0.1:5000/api/file-upload/csv', {
            method: 'POST',
            body: formData
            })
            const content = await response.blob()
            const url = window.URL.createObjectURL(content)
            setCSVFileContent(url)
            setLoadingStatus([0])
        }catch(err){
            console.log("Error uploading files : ", err)
        }
        setCSVFiles(null)
        CSVInputRef.current.value = null
        setLoaderTrue(false)
    }
    //sending text files
    const [txtfileContent, settxtFileContent] = useState<string>()
    const sendtxt = async () => {
        const formData = new FormData()
        txtFilesKeys.map((key: number)=>{
            if(txtFiles[key] instanceof File){
                formData.append(`file${key}`, txtFiles[key])
            }
        })
        try{
            setLoaderTrue(true)
            const response = await fetch('http://127.0.0.1:5000/api/file-upload/plain', {
            method: 'POST',
            body: formData
            })
            const content = await response.blob()
            const url = window.URL.createObjectURL(content)
            console.log(response)
            console.log(content)
            console.log(url)
            settxtFileContent(url)
            setLoadingStatus([0])
        }catch(err){
            console.log("Error uploading files : ", err)
        }
        settxtFiles(null)
        txtInputRef.current.value = null
        setLoaderTrue(false)
    }

    const scrollReference = useRef()
    
    const Scroll = () => {const element = scrollReference.current as any; element.scrollIntoView()}
    
    // reset files to null
    if(CSVFiles?.length === 0) {
        CSVInputRef.current.value = null
    }
    if(txtFiles?.length === 0) {
        txtInputRef.current.value = null
    }
    const CSVCancelBtn = () => {
        setCSVFiles(null)
        CSVInputRef.current.value = null
        setCSVErrorMessageShow(false)
    }
    const txtCancelBtn = () => {
        settxtFiles(null)
        txtInputRef.current.value = null
        settxtErrorMessageShow(false)
    }
    const FilesExtensionChecking = (file: string) => {
        if(file === 'CSV'){
            for (let key = 0; key < CSVFilesKeys.length; key++ ){
                const file = CSVFiles[key]
                if(file.type !== 'text/csv'){
                    setCSVErrorMessageShow(true)
                    break;
                }
                sendCSV()
            }            
        }
        if(file === 'TXT'){
            for (let key = 0; key < txtFilesKeys.length; key++ ){
                const file = txtFiles[key]
                if(file.type !== "text/plain"){
                    settxtErrorMessageShow(true)
                    break;
                }
                sendtxt()
            }
        }
    }
    return(
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <AdminSideBarDash /> 
                <div className="flex flex-col">
                    <AdminNavBarDash />
                    <main className="flex-1 p-4 md:p-6">
                    {
                        !requestLoading?
                        (
                            /*mainData && mainData.status */ 200 === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2">
                                <div className="flex flex-col items-center justify-center gap-12 px-8 xl:flex-row ">
                <div className="flex flex-col items-center justify-center bg-sickness-primaryText/20 px-10 pt-12 pb-6 rounded-3xl border-2 border-gray-300 shadow-xl mt-24 mb-4 md:w-fit w-[29rem]">
                    <p className="font-semibold text-4xl text-slate-950 text-center">
                        Upload and attach CSV files
                    </p>
                    <p className="mt-5 text-slate-600 font-semibold text-center">
                        Upload and attach files for data nomalization and to prepare them for the model training
                    </p>
                    <Input type="file" onChange={(e)=>{setCSVFiles(e.target.files); setCSVErrorMessageShow(false); setCSVFileContent(undefined); settxtFileContent(undefined)}} multiple className="mt-12 hover:cursor-pointer" ref={CSVInputRef} />
                    <div className="flex mt-8 gap-5 flex-col">
                        { CSVFiles && 
                            CSVFilesKeys.map((key: any)=>{
                                let file = CSVFiles[key]
                                return (
                                    <div className="flex w-96 bg-gray-50 border-2 h-28 border-gray-400 rounded-lg hover:border-2 hover:border-black transform duration-200 hover:scale-[1.02] justify-between" key={key}>
                                        <div className="flex items-center gap-3 px-2 cursor-default">
                                            <div>
                                                {file.type !== "text/csv" ? <FileX className="w-10 h-10 text-red-500" /> : <FileCheck className="w-10 h-10 " />}
                                            </div>
                                            <div className="flex flex-col text-slate-900 truncate justify-center">
                                                <p className="font-semibold">{RemoveLongChars(file.name,20)}</p>
                                                <p>{(file.size/1024).toFixed(2)} KB</p>
                                                { file.type !== "text/csv" ? <p className="text-red-500">Only <span className="font-semibold">CSV</span> files are accepted !</p> : ""}
                                            </div>    
                                        </div>
                                        <X className="w-[1.75rem] h-[1.75rem] mt-[7px] mr-[6px] cursor-pointer transform transition duration-200 hover:rotate-90" onClick={()=>removeCSVFile(key)}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {CSVFiles?.length > 0 && 
                        <div className="flex w-full justify-between gap-8">
                            <button className="flex flex-[0.5] items-center justify-center mt-6 bg-white border-2 border-slate-900 text-black p-3 rounded-md hover:bg-gray-100 gap-2 w-32" onClick={()=>CSVCancelBtn()}>
                                Cancel
                            </button>
                            <button className="flex mt-6 flex-[0.5] items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2" onClick={()=>FilesExtensionChecking('CSV')}>
                                <p>Load Files</p>
                                <FileUp className="w-6 h-6" />
                            </button>
                        </div>
                    }
                </div>
                <div className="flex flex-col items-center justify-center bg-white px-10 pt-12 pb-6 rounded-3xl border-2 border-gray-300 shadow-xl mt-24 mb-4 md:w-fit w-[29rem]">
                    <p className="font-semibold text-4xl text-slate-950 text-center">
                        Upload and attach text files
                    </p>
                    <p className="mt-5 text-slate-600 font-semibold text-center">
                        Upload and attach text files for a better feature selection during data normalization
                    </p>
                    <Input type="file" onChange={(e)=>{settxtFiles(e.target.files);  settxtErrorMessageShow(false); setCSVFileContent(undefined); settxtFileContent(undefined)}} multiple className="mt-12 hover:cursor-pointer" ref={txtInputRef} />
                    <div className="flex mt-8 gap-5 flex-col">
                        { txtFiles && 
                            txtFilesKeys.map((key: any)=>{
                                let file = txtFiles[key]
                                
                                return (
                                    <div className="flex w-96 bg-gray-50 border-2 h-28 border-gray-400 rounded-lg hover:border-2 hover:border-black transform duration-200 hover:scale-[1.02] justify-between" key={key}>
                                        <div className="flex items-center gap-3 px-2 cursor-default">
                                            <div>
                                                {file.type !== "text/plain" ? <FileX className="w-10 h-10 text-red-500" /> : <FileCheck className="w-10 h-10 " />}
                                            </div>
                                            <div className="flex flex-col text-slate-900 truncate justify-center">
                                                <p className="font-semibold">{RemoveLongChars(file.name, 20)}</p>
                                                <p>{(file.size/1024).toFixed(2)} KB</p>
                                                { file.type !== "text/plain" ? <p className="text-red-500">Only <span className="font-semibold">text</span> files are accepted !</p> : ""}
                                            </div>    
                                        </div>
                                        <X className="w-[1.75rem] h-[1.75rem] mt-[7px] mr-[6px] cursor-pointer transform transition duration-200 hover:rotate-90" onClick={()=>removetxtFile(key)}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {txtFiles?.length > 0 && 
                        <div className="flex w-full justify-between gap-8">
                            <button className="flex flex-[0.5] items-center justify-center mt-6 bg-white border-2 border-slate-900 text-black p-3 rounded-md hover:bg-gray-100 gap-2 w-32" onClick={()=>txtCancelBtn()}>
                                Cancel
                            </button>
                            <button className="flex mt-6 flex-[0.5] items-center justify-center bg-[#344966] border-2 border-[#344966] text-white p-3 rounded-md hover:bg-slate-700 gap-2" onClick={()=>FilesExtensionChecking('TXT')}>
                                <p>Load Files</p>
                                <FileUp className="w-6 h-6" />
                            </button>
                        </div>
                    }
                </div>
                { LoaderTrue && <DataLoader status={statusLoading[statusLoading.length-1]} /> }
            </div>
            { (CSVErrorMessageShow || txtErrorMessageShow) ? <p className="text-red-500 text-xl mt-2">Only specific files are accepted !</p> : "" }
            { ( CSVfileContent || txtfileContent ) ? <a href={ CSVfileContent ? CSVfileContent : txtfileContent } download={CSVfileContent ? "Result.csv" : "Result.txt"} target="_blank" rel="noopener noreferrer" className="flex mt-6 items-center justify-center bg-[#0D1821] border-2 border-[#0D1821] text-white p-4 rounded-md tranition duration-100 hover:bg-slate-800 gap-2 h-fit"> <button> Download Result </button> </a> : "" }
                                </div>
                            </>
                            :
                            <ErrorFetching />
                        )
                        :
                        <div className="w-full h-full flex justify-center items-center">
                            <MainLoader />
                        </div>
                    }
                    </main>
                </div>
            </div>   
    )
}

export default File_Insert