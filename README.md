# Video Sharing Platform

A MERN-based video-sharing platform that uses Firebase to store videos and their thumbnails. This platform enables users to upload, view, and share videos.

---

## Features
- **Frontend:** Built with React (Vite), featuring a user-friendly interface for browsing and uploading videos.
- **Backend:** Powered by Express.js and MongoDB for API and database operations.
- **Firebase Storage:** Used for storing videos and thumbnails.
- **Authentication:** JWT-based secure user authentication.

---

## Prerequisites
Before setting up the project, ensure you have:
- [Node.js](https://nodejs.org/) 
- Reactjs
- Firebase project setup
- MongoDB database connection string

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AbhiK2244/VideoSharing-Platform
cd video-sharing-platform
```
### 2. Install all the dependencies
for client and server
```bash
npm install
```
### 3. Run the server
for client 
```bash
npm run dev
```
for server
```bash
node index.js
```

### 4. Create .env file and Add the respective variables
### For server
- **DB_CONNECTION_STRING**=your_mongodb_connection_string
- **JWT_SECRET_KEY**=your_jwt_secret_key

### For client (firebase api keys)
- VITE_API_KEY=AIzaSyDxxxxxxxxxxxx
- VITE_AUTH_DOMAIN=example.firebaseapp.com
- VITE_PROJECT_ID=example-project-id
- VITE_STORAGE_BUCKET=example.appspot.com
- VITE_MESSAGING_SENDER_ID=123456789012
- VITE_APP_ID=1:123456789012:web:abcdef123456
