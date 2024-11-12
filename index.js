const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(cors());

// Route to receive NFC data
app.post('/receive-nfc-data', (req, res) => {
    const nfcData = req.body.data; // The NFC data sent from the phone
    console.log('Received NFC data:', nfcData);

    // Respond back
    res.json({ status: 'success', message: 'NFC data received' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
