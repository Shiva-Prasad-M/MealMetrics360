import React, { useState } from 'react';
import axios from 'axios';

const FrequentUsersSales = () => {
  const [file, setFile] = useState(null);
  const [predictedSales, setPredictedSales] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload the file for training the model
      const response = await axios.post('http://127.0.0.1:5000/train', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(response.data.message);  // Notify user that model has been trained

      // After training, you can use the /predict endpoint for making predictions
      const predictionResponse = await axios.post('http://127.0.0.1:5000/predict', {
        "Discount Rate": 20  // Sample input for prediction (can be dynamic based on user input)
      });

      setPredictedSales(predictionResponse.data['Predicted Sales']);
    } catch (error) {
      console.error("Error:", error);
      setError("There was an error processing your request.");
    }
  };

  return (
    <div>
      <h1>Upload Customer Data for Prediction</h1>
      <form onSubmit={handleFileUpload} encType="multipart/form-data">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>

      {predictedSales && (
        <div>
          <h3>Predicted Sales: {predictedSales}</h3>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default FrequentUsersSales;
