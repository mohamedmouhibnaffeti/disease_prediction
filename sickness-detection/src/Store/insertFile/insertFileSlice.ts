
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useMessagingServer = () => {
    const socket = io('http://127.0.0.1:5000');
    const [statusLoading, setLoadingStatus] = useState<Array<number>>([0]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('message', (data)=>{
            console.log(data)
            setLoadingStatus([...statusLoading, data])
        })
    }, []);

    return statusLoading;
}
{/*
export const useCSVStates = () => {
    const [CSVErrorMessageShow, setCSVErrorMessageShow] = useState<boolean>(false);
    const [CSVFiles, setCSVFiles] = useState<any>();
    const CSVInputRef = useRef<any>();
    const [LoaderTrue, setLoaderTrue] = useState<boolean>(false);
    const [CSVfileContent, setCSVFileContent] = useState<string>();

    return { CSVErrorMessageShow, setCSVErrorMessageShow, CSVFiles, setCSVFiles, CSVInputRef, LoaderTrue, setLoaderTrue, CSVfileContent, setCSVFileContent };
}*/}
