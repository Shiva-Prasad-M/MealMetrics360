import React, { useState } from "react";
import * as XLSX from "xlsx";  // Import the xlsx library
import './FileUpload.css';  // Import the CSS file

const FileUpload = () => {
  const [file, setFile] = useState(null); // To store the file
  const [fileDetails, setFileDetails] = useState(null); // To store file details
  const [excelData, setExcelData] = useState(null); // To preview the parsed data
  
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // Set file details
      setFile(uploadedFile);
      setFileDetails({
        name: uploadedFile.name,
        size: (uploadedFile.size / 1024).toFixed(2) + " KB",
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        setExcelData(jsonData); // Set parsed data for preview
      };

      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);  // Append the file itself to FormData
      console.log("append  successfully");
     console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
         
      if (response.ok) {
        alert("Data successfully sent to the backend!");
      } else {
        alert("Failed to send data to the backend.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("An error occurred while sending data.");
    }
  };

  return (
    <div className="file-upload-container">
      <h2 className="file-upload-title">Excel File Upload and Preview</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="file-upload-input"
      />

      {/* Display file details if available */}
      {fileDetails && (
        <div className="file-details">
          <p>File Name: {fileDetails.name}</p>
          <p>File Size: {fileDetails.size}</p>
        </div>
      )}

      {/* Display Excel data preview */}
      {excelData && (
        <div className="table-container">
          <h3>Excel File Preview</h3>
          <table className="table-preview">
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit button to send data to backend */}
      <button onClick={handleSubmit} className="submit-button">
        Submit to Backend
      </button>
    </div>
  );
};

export default FileUpload;
