// Import necessary modules and dependencies
const express = require('express');
const path = require('path');

// Create an instance of the Express application
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function brownLine(google, map) {
    // Function implementation goes here
  }
  
  function greenLine(google, map) {
    // Function implementation goes here
  }
  
  function orangeLine(google, map) {
    // Function implementation goes here
  }
  
  function pinkLine(google, map) {
    // Function implementation goes here
  }
  
  function purpleLine(google, map) {
    // Function implementation goes here
  }
  
  function yellowLine(google, map) {
    // Function implementation goes here
  }
  
  // Add the remaining line functions here
  
  // Initialize the map and fetch train data
  function initMap() {
    // Code for initializing the map and other functions goes here
  }
  
  window.initMap = initMap;
  
