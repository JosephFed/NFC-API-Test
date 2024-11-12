if ('NDEFReader' in window) {
    const startScanButton = document.getElementById('startScan');
    const nfcDataDiv = document.getElementById('nfcData');

    // Set up the NFC scan button
    startScanButton.addEventListener('click', async () => {
        try {
            const ndef = new NDEFReader();
            await ndef.scan(); // Start scanning for NFC tags
            console.log('NFC scan started.');

            ndef.onreading = async (event) => {
                const message = event.message;
                let nfcData = '';

                // Decode the NFC message and extract the data
                for (const record of message.records) {
                    if (record.recordType === 'text') {
                        const textDecoder = new TextDecoder(record.encoding);
                        nfcData += textDecoder.decode(record.data);
                    }
                }

                nfcDataDiv.textContent = `Read NFC Data: ${nfcData}`;
                console.log('NFC Data:', nfcData);

                // Send the data to the laptop via HTTP POST request
                await sendNfcDataToLaptop(nfcData);
            };

            ndef.onerror = (error) => {
                console.error('NFC read error:', error);
            };
        } catch (error) {
            console.error('Error starting NFC scan:', error);
        }
    });

    // Function to send NFC data to the laptop's server
    async function sendNfcDataToLaptop(data) {
        const response = await fetch('http://192.168.80.1:3000/receive-nfc-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        });

        const responseData = await response.json();
        console.log('Server Response:', responseData);
    }
} else {
    alert('Web NFC is not supported on this device.');
}