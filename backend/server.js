const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// --- SERIAL HARDWARE LAYER ---
const COM_PORT = 'COM5';
const BAUD_RATE = 9600;

console.log(`[INIT] Attempting to open serial port ${COM_PORT}...`);

let port;
try {
  port = new SerialPort({ path: COM_PORT, baudRate: BAUD_RATE });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  port.on('open', () => console.log(`✅ [SERIAL] Arduino on ${COM_PORT}`));
  port.on('error', err => console.error(`❌ [SERIAL ERROR] ${err.message}`));

  parser.on('data', (line) => {
    console.log("RAW SERIAL:", line.trim());
    
    // Expected: DATA,DATE,TIME,Name,RollNo,Enrollment,UID,Status
    if (line.startsWith('DATA,')) {
      const parts = line.split(',');
      if (parts.length >= 8) {
        const name = parts[3];
        const status = parts[7].trim().toLowerCase() === 'denied' ? 'denied' : 'success';
        
        // Build scan datagram
        const scanData = {
          uid: parts[6],
          name: name,
          branch: parts[4], // Using RollNo logically based on the Excel output
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: status,
          timestamp: new Date()
        };

        // Emit to sockets instantly
        io.emit('new_scan', { id: Date.now(), ...scanData });
      }
    }
  });
} catch (e) {
  console.error(`❌ [INIT ERROR] Could not open ${COM_PORT}:`, e.message);
}

io.on('connection', (socket) => {
  console.log(`🔗 [SOCKET] Client connected: ${socket.id}`);
});

const PORT = 3001;
server.listen(PORT, () => console.log(`🚀 Proxi Bridge on http://localhost:${PORT}\n`));
