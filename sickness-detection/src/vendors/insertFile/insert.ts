// functions.ts
export const RemoveLongChars = (str: string, maxlen: number) => {
    if(str.length <= maxlen){
        return str
    }
    const filteredstr = str.split('.');
    const extension: any = filteredstr.pop();
    const truncatedName = str.slice(0, maxlen - (extension.length + 1));

    return truncatedName + '....' + extension;
}

export const FilesExtensionChecking = (file: string, CSVFiles: any, CSVFilesKeys: any, setCSVErrorMessageShow: any, sendCSV: any) => {
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
