const sendCSV = async (CSVFilesKeys, CSVFiles, setCSVFileContent, setLoadingStatus, setCSVFiles, CSVInputRef) => {
    const formData = new FormData();
    CSVFilesKeys.map((key) => {
        if (CSVFiles[key] instanceof File) {
            formData.append(`file${key}`, CSVFiles[key]);
        }
    });

    try {
        const response = await fetch('http://127.0.0.1:5000/api/file-upload/csv', {
            method: 'POST',
            body: formData
        });
        const content = await response.blob();
        const url = window.URL.createObjectURL(content);
        setCSVFileContent(url);
        setLoadingStatus([0]);
    } catch (err) {
        console.log("Error uploading files : ", err);
    }

    setCSVFiles(null);
    CSVInputRef.current.value = null;
};

export { sendCSV };
