# Wildfire Sentinel 🔥

Wildfire Sentinel is a React-based web application that displays NASA wildfire data on an interactive OpenStreetMap. The application fetches wildfire event data from NASA’s EONET API (via a custom Express backend) and overlays the events as markers on the map. Each marker provides details about the wildfire event, including title, location, date, and coordinates. A draggable date picker allows users to specify a date range for which the data is displayed.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Production Mode (Locally)](#production-mode-locally)
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

### Production Mode 

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

### Hosting

This site is hosted on Render, using the same 3 commands shown above. After `npm run start:api` is run, the React app is served from port `10000`.

I'm using the free tier of render, which spins down with inactivity delaying the initial requests by 50 seconds or more after a long period of inactivity. Please be patient when trying to view the hosted version.

## How It Works

### Frontend (React)

- **Entry Point:** The application starts in `index.js`, which renders the main `App` component inside a `<React.StrictMode>` wrapper.
- **App Component:**  
  - **Data Fetching:** Upon mounting, the `App` component uses the `useEffect` hook to fetch wildfire events from the Express API using a specified date range.
  - **Loading State:** While data is being fetched, a `Loader` component displays a spinner.
  - **Map Rendering:** Once data is fetched, the `OSMMap` component renders an interactive map (via `react-leaflet`) with wildfire markers.
  - **Date Picker:** A draggable date picker (powered by `react-draggable`) allows users to adjust the date range. Changing the dates refetches data.

### Backend (Express)

- **Express Server Setup:**  
  The server is built using Express. It listens on port `3001` (or the port specified in `process.env.PORT`).

- **API Endpoint:**  
  - **Route:** `/api/events`  
  - **Query Parameters:** Accepts `start` and `end` date parameters to query events.
  - **Functionality:**  
    The server fetches wildfire event data from NASA’s EONET API filtered by the provided date range. If the fetch is successful, it returns the events; otherwise, it handles errors gracefully.

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

   