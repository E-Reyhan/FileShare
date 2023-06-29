import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import React from 'react';
import copy from 'copy-to-clipboard';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file])
  
  const handleCopyPath = () => {
    copy(result);
  };
  
  const onUploadClick = () => {
    fileInputRef.current.click();
  }
    
  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>FileShare</h1>
        <p>Welcome To FileShare!</p>
        <p>Upload, Share and Download File!</p>
        
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div>
        <input type="text" placeholder='Copy File Link Here' value={result} readOnly/>
        <button id="CopyButton"onClick={handleCopyPath}>Copy Path</button>
        </div>
      </div>
    </div>
  );
}

export default App;