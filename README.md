# Proxi 🪪

Proxi is an IoT-based smart attendance system that bridges physical RFID hardware with a modern, real-time web dashboard.

## 🏗️ Architecture

The system consists of three main components:

1. **Hardware / Microcontroller (`rfid_read_personal_data.ino`)**
   - Uses an Arduino/ESP8266 paired with an MFRC522 RFID reader.
   - Scans MIFARE student ID cards and reads encrypted student details (Name, Roll No, UID).
   - Transmits this data over a Serial Connection (USB).

2. **Node.js Gateway / Backend (`backend/server.js`)**
   - A lightweight Node.js Server acts as a bridge.
   - Listens to the local Serial Port (e.g., `COM5`) to capture incoming hardware scans.
   - Uses WebSockets (`Socket.IO`) to instantly broadcast the parsed student data to connected clients.

3. **React Dashboard (`frontend/`)**
   - A modern React application built with Vite and styled using Tailwind CSS.
   - Listens to the real-time WebSocket events from the backend to instantly update the UI when a student scans their card, requiring no page refreshes.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Arduino IDE (for uploading the `.ino` script)
- An Arduino/ESP board with an MFRC522 RFID module.

### 1. Hardware Setup (Arduino)
1. Open `rfid_read_personal_data/rfid_read_personal_data.ino` in the Arduino IDE.
2. Ensure you have the `MFRC522` library installed.
3. Wire your MFRC522 to the microcontroller according to the pin layout in the script.
4. Upload the code to your Arduino. Keep it plugged into your PC via USB.

### 2. Backend Setup (Node.js)
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Open `server.js` and verify that the `COM_PORT` matches the port your Arduino is connected to (e.g., `COM5` on Windows, `/dev/ttyUSB0` on Linux/Mac).
4. Run the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup (React)
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the local address provided by Vite (usually `http://localhost:5173`) to view the real-time dashboard.

## 🛡️ Security & Privacy
This repository does not contain production secrets or personal API keys. Data transmitted from the RFID cards is read securely utilizing MIFARE authentication keys blocks.

---
*Developed for smart, frictionless attendance tracking.*
