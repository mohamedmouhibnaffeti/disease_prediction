const sendCSV = async (
    CSVFilesKeys: number[],
    CSVFiles: any,
    setCSVFileContent: React.Dispatch<React.SetStateAction<string | undefined>>,
    setLoadingStatus: React.Dispatch<React.SetStateAction<number[]>>,
    setCSVFiles: any,
    CSVInputRef: any,
    setLoaderTrue: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const formData = new FormData();
    setLoaderTrue(true);
    CSVFilesKeys.map((key) => {
      if (CSVFiles[key] instanceof File) {
        formData.append(`file${key}`, CSVFiles[key]);
      }
    });
  
    try {
      const response = await fetch('http://127.0.0.1:5000/preprocess', {
        method: 'POST',
        body: formData
      });
      const content = await response.blob();
      const url = window.URL.createObjectURL(content);
      setCSVFileContent(url);
      setLoadingStatus([0]);
    } catch (err) {
      console.log("Error uploading files : ", err);
    }finally {
      setLoaderTrue(false);
    }
  
    setCSVFiles(null);
    if (CSVInputRef.current) {
      CSVInputRef.current.value = null;
    }
  };
  
  export { sendCSV };
  