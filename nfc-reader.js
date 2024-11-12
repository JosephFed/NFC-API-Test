// if ('NDEFReader' in window) {
//     const startScanButton = document.getElementById('startScan');
//     const nfcDataDiv = document.getElementById('nfcData');

//     // Set up the NFC scan button
//     startScanButton.addEventListener('click', async () => {
//         try {
//             const ndef = new NDEFReader();
//             await ndef.scan(); // Start scanning for NFC tags
//             console.log('NFC scan started.');

//             ndef.onreading = async (event) => {
//                 const message = event.message;
//                 let nfcData = '';

//                 // Decode the NFC message and extract the data
//                 for (const record of message.records) {
//                     if (record.recordType === 'text') {
//                         const textDecoder = new TextDecoder(record.encoding);
//                         nfcData += textDecoder.decode(record.data);
//                     }
//                 }

//                 nfcDataDiv.textContent = `Read NFC Data: ${nfcData}`;
//                 console.log('NFC Data:', nfcData);

//                 // Send the data to the laptop via HTTP POST request
//                 await sendNfcDataToLaptop(nfcData);
//             };

//             ndef.onerror = (error) => {
//                 nfcDataDiv.textContent = `Error`
//                 console.error('NFC read error:', error);
//             };
//         } catch (error) {
//             nfcDataDiv.textContent = `Error2`
//             console.error('Error starting NFC scan:', error);
//         }
//     });

//     // Function to send NFC data to the laptop's server
//     async function sendNfcDataToLaptop(data) {
//         const response = await fetch('http://localhost:3000/receive-nfc-data', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ data: data })
//         });

//         const responseData = await response.json();
//         console.log('Server Response:', responseData);
//     }
// } else {
//     alert('Web NFC is not supported on this device.');
// }
const socket = new WebSocket('wss://192.168.80.1:8080'); // Replace with your laptop's IP address

socket.onopen = () => {
  console.log('WebSocket connected');
};
socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
  if (event.data === 'CHANGE_PAGE') {
    window.location.href = "http://localhost:3000/newPage"; // Change to a new page on your localhost
  }
};

document.getElementById('startScan').addEventListener('click', async () => {
  //async function startNFCScan() {
    const output = document.getElementById('output');
    output.textContent = 'Starting NFC detection...';
  
    // Check if the Web NFC API is supported
    if ('NDEFReader' in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        output.textContent = 'NFC detection started. Bring an NFC tag close.';
  
        ndef.onreading = () => {
          // This event triggers whenever an NFC tag is detected
          output.textContent = 'NFC tag detected!';
          socket.send('NFC_DETECTED');
        };
        ndef.onreadingerror = () => {
          // This event triggers if the NFC tag reading fails
          output.textContent = 'NFC detection failed. Try again.';
        };
      } catch (error) {
        output.textContent = `Error: ${error.message}`;
      }
    } else {
      output.textContent = 'Web NFC is not supported on this device.';
    }
  });

  // Automatically start NFC scan when the page loads
//window.addEventListener('load', startNFCScan);
  
  