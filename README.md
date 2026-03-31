# 🎹 Harmoniq

**Harmoniq** is a premium, dual-mode virtual instrument built with React, Vite, and Firebase. It features a modern, glassmorphic **Piano** and a rich, traditional **Indian Harmonium** with authentic synthesis.

![Harmoniq Banner](https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=2070)

## ✨ Features

- **Dual Aesthetic Modes**: 
  - **Piano (Minimal)**: A sleek, modern interface with glassmorphism and vibrant accents.
  - **Harmonium (Classic)**: A rich, wooden-textured layout with authentic Indian flat-style keys and 8px precision.
- **Advanced Audio Engine**:
  - Tri-oscillator synthesis with sawtooth, square, and triangle waves.
  - Real-time **Reverb** control.
  - **Octave Shift** (1-8) to change pitch and depth.
  - Professional ADSR envelopes for realistic sound decay.
- **Recording & Cloud Storage**:
  - Record your sessions and save them to the cloud.
  - **Firebase Authentication**: Sign in with Google to protect your library.
  - Persistent library for playback and deletion.
- **Intuitive Controls**:
  - Fully mapped computer keyboard support.
  - Dynamic visual labels on keys.

## 🛠️ Built With

- **React** - Component architecture
- **Vite** - Lightning-fast build tool
- **Firebase** - Authentication and Firestore database
- **Web Audio API** - Custom synthesis engine
- **Lucide Icons** - Clean, modern iconography

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Firebase project for authentication and storage

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/harmoniq.git
   cd harmoniq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by Antigravity
