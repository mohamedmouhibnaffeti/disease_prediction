
import { io } from "socket.io-client"
import { useEffect, useRef, useState } from "react";
const socket = io('http://127.0.0.1:5000')

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

    export const RemoveLongChars = (str: string, maxlen: number) => {
        if(str.length <= maxlen){
            return str
        }
        const filteredstr = str.split('.');
        const extension: any = filteredstr.pop();
        const truncatedName = str.slice(0, maxlen - (extension.length + 1));

        return truncatedName + '....' + extension;
    }

    const [CSVErrorMessageShow, setCSVErrorMessageShow] = useState<boolean>(false)
    export const CSVInputRef = useRef<any>()
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

    
    // reset files to null
    if(CSVFiles?.length === 0) {
        CSVInputRef.current.value = null
    }
    const CSVCancelBtn = () => {
        setCSVFiles(null)
        CSVInputRef.current.value = null
        setCSVErrorMessageShow(false)
    }
    export const FilesExtensionChecking = (file: string) => {
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
    }

export { CSVFiles };
