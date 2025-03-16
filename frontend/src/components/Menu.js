import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuComponent from './MenuComponent';
import RecommendItems from './RecommendItems';
function Menu() {
  // const [names, setNames] = useState([]);
  // const [inputMessage, setInputMessage] = useState('');

  // useEffect(() => {
  //   // Fetch data from the Flask backend on component mount
  //   axios.get('http://localhost:5000/db')
  //     .then(response => {
  //       // Extract names from the database array
  //       const fetchedNames = response.data.database.map(item => item.name);
  //       setNames(fetchedNames);  // Set names in the state
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the data!', error);
  //     });
  // }, []);

  // const sendMessage = () => {
  //   axios.post('http://localhost:5000/ss', { message: inputMessage })
  //     .then(response => {
  //       console.log(response.data);
  //       setInputMessage('');  // Clear the input field after sending
  //     })
  //     .catch(error => {
  //       console.error('There was an error sending the message!', error);
  //     });
  // };

  return (
    <>
    <div>

    </div>
    <div >
       <MenuComponent/>
    </div>
   
    </>
  );
}

export default Menu;
