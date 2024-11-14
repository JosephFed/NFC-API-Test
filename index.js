// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const path = require('path'); 
// const cors = require('cors');
// const port = 3000;

// app.use(express.static(path.join(__dirname, 'public')));

// // Middleware to parse incoming JSON
// app.use(bodyParser.json());
// app.use(cors({
//   origin: 'https://josephfed.github.io/NFC-API-Test/', // Replace with the exact URL of the HTTPS server (last:*)
//   methods: 'GET,POST',
//   allowedHeaders: 'Content-Type'
// })) 

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'public', 'html', 'index.html'));
// });
// // Route to receive NFC data
// app.post('/receive-nfc-data', (req, res) => {
//     const nfcData = req.body.data; // The NFC data sent from the phone
//     console.log('Received NFC data:', nfcData);

//     // Respond back
//     res.json({ status: 'success', message: 'NFC data received' });
// });

// const ip = '0.0.0.0';
// app.listen(port, ip,() => {
//     console.log(`Server running at http://localhost:${port}`);
// });