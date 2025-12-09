// src/components/CheckInScanner.jsx
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import apiService from '../services/apiService'; 

const CheckInScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [checkInStatus, setCheckInStatus] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Function to handle the successful scan of a QR code
  const handleScan = async (result, error) => {
    if (!!result) {
      setScanResult(result?.text);
      setIsScanning(false);
      
      // Stop the scanner and process the check-in
      await handleCheckIn(result?.text);
    }

    if (!!error && error.name !== 'NotFoundError') {
      // You can log specific errors like PermissionDeniedError
      console.error(error); 
    }
  };

  // Function to send data to the backend check-in endpoint
  const handleCheckIn = async (qrCodeData) => {
    setCheckInStatus('Checking in...');

    try {
      const response = await apiService('/tickets/checkin', {
        method: 'POST',
        // This is the data the backend expects
        body: JSON.stringify({ qrCodeData: qrCodeData }),
      });

      if (response && response.message) {
        setCheckInStatus(`SUCCESS: ${response.message}. Attendee: ${response.attendeeName || 'N/A'}`);
      }
    } catch (error) {
      setCheckInStatus(`FAILURE: ${error.message || 'Check-in failed.'}`);
      console.error('Check-in API Error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Ticket Check-In</h2>
      
      <div className="mb-4 text-center">
        <button
          onClick={() => setIsScanning(true)}
          disabled={isScanning}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 disabled:opacity-50"
        >
          {isScanning ? 'Scanner Active...' : 'Start Scanner'}
        </button>
      </div>

      {isScanning && (
        <div className="border-4 border-gray-300 rounded-lg overflow-hidden mb-6">
          {/* QR Code Reader Component */}
          <QrReader
            onResult={handleScan}
            constraints={{ facingMode: 'environment' }} // Use rear camera on mobile
            scanDelay={300} // Milliseconds delay between scans
            containerStyle={{ width: '100%', padding: '20px' }}
            videoStyle={{ width: '100%' }}
          />
        </div>
      )}

      {scanResult && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold">Last Scanned Data:</p>
          <p className="break-all text-sm text-gray-700">{scanResult}</p>
        </div>
      )}

      {checkInStatus && (
        <div className={`mt-4 p-4 rounded-lg font-bold text-center ${
          checkInStatus.startsWith('SUCCESS') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {checkInStatus}
        </div>
      )}
    </div>
  );
};

export default CheckInScanner;