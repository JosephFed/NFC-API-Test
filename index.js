// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');
// const port = 3000;

// // Middleware to parse incoming JSON
// app.use(bodyParser.json());
// app.use(cors());

// // Route to receive NFC data
// app.post('/receive-nfc-data', (req, res) => {
//     const nfcData = req.body.data; // The NFC data sent from the phone
//     console.log('Received NFC data:', nfcData);

//     // Respond back
//     res.json({ status: 'success', message: 'NFC data received' });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;
const path = require('path');

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Variable to store NFC data
let nfcData = '';

// Route to receive NFC data from the Android phone
app.post('/receive-nfc-data', (req, res) => {
    nfcData = req.body.data; // Save the NFC data sent from the phone
    console.log('Received NFC data:', nfcData);
    res.json({ status: 'success', message: 'NFC data received' });
});

// Route to fetch NFC data for the laptop's HTML page
app.get('/nfc-data', (req, res) => {
    res.json({ data: nfcData });
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
