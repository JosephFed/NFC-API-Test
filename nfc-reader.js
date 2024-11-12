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

document.getElementById('startScan').addEventListener('click', async () => {
    const output = document.getElementById('output');
    output.textContent = 'Starting NFC scan...';
  
    // Check for NFC API availability
    if ('NDEFReader' in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        output.textContent = 'NFC scan started. Bring your NFC tag close to scan.';
  
        ndef.onreading = (event) => {
          const { serialNumber, message } = event;
          output.innerHTML = `<p>Serial Number: ${serialNumber}</p>`;
  
          for (const record of message.records) {
            switch (record.recordType) {
              case 'text':
                const textDecoder = new TextDecoder(record.encoding);
                output.innerHTML += `<p>Text: ${textDecoder.decode(record.data)}</p>`;
                break;
              case 'url':
                const url = new TextDecoder().decode(record.data);
                output.innerHTML += `<p>URL: <a href="${url}" target="_blank">${url}</a></p>`;
                break;
              default:
                output.innerHTML += `<p>Unknown record type: ${record.recordType}</p>`;
            }
          }
        };
  
        ndef.onreadingerror = () => {
          output.textContent = 'NFC reading failed. Please try again.';
        };
      } catch (error) {
        output.textContent = `Error: ${error.message}`;
      }
    } else {
      output.textContent = 'Web NFC is not supported on this device.';
    }
  });
  