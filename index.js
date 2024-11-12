const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const wss = new WebSocket.Server({ port: 8080 });
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

wss.on('connection', (ws) => {
    console.log('Phone A connected via WebSocket');
  
    ws.on('message', (message) => {
      console.log(`Received message from Phone A: ${message}`);
      // Trigger action on receiving message (e.g., change page)
      if (message === 'NFC_DETECTED') {
        // Broadcast to all clients connected to the server
        ws.send('CHANGE_PAGE');
      }
    });
});