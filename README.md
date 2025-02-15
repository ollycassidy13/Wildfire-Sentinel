# Wildfire Sentinel 🔥

Wildfire Sentinel is a React-based web application that displays NASA wildfire data on an interactive OpenStreetMap. The application fetches wildfire event data from NASA’s EONET API (via a custom Express backend) and overlays the events as markers on the map. Each marker provides details about the wildfire event, including title, location, date, and coordinates. A draggable date picker allows users to specify a date range for which the data is displayed.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode (Locally)](#production-mode-locally)
  - [Deployment to Vercel](#deployment-to-vercel)
- [How It Works](#how-it-works)
  - [Frontend (React)](#frontend-react)
  - [Backend (Express)](#backend-express)
  - [Data Flow](#data-flow)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

- **Interactive Map:** Uses [react-leaflet](https://react-leaflet.js.org/) to display wildfire events on an OpenStreetMap.
- **Custom Markers:** Each wildfire event is represented by a custom marker with a wildfire icon.
- **Event Details:** Clicking a marker opens a popup showing event details like title, location, date, and coordinates.
- **Date Range Picker:** A draggable date picker lets you select the start and end dates to fetch wildfire data.
- **Express API Proxy:** A lightweight Express server fetches data from NASA’s EONET API to avoid CORS issues.
- **Vercel Deployment:** Easily deploy the app on Vercel with separate API and frontend.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ollycassidy13/Wildfire-Sentinel
   cd wildfire-sentinel
   ```

2. **Install dependencies for both client and server:**

   ```bash
   npm run install:all
   ```

   This installs dependencies in both the `client` (React) and `api` (Express) directories.

## Running the Application

### Production Mode (Locally)

To run the application in **production mode** locally:

1. **Build the React app:**

   ```bash
   npm run build
   ```

2. **Start the Express server and serve the built React app:**

   ```bash
   npm run start:api
   ```

   This serves the React app from the Express server at `http://localhost:3001`.

## Folder Structure

This project is structured as shown below:

```
Wildfire-Sentinel/
├── api/                # Express Backend
│   ├── server.js
│   ├── package.json
├── client/             # React Frontend
│   ├── public/
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── wildfire-icon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Loader.js
│   │   │   ├── OSMMap.js
│   │   │   ├── spinner.gif
│   │   │   ├── WildfireMarker.js
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   ├── package.json
├── .gitignore
├── LICENSE.txt
├── package.json        # Root Deployment Config
└── README.md
```

## License

This project is open source and available under the [MIT License](LICENSE).

   