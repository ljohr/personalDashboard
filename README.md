# Personal Dashboard

## Description

This dashboard is a personalized hub for tracking Canvas course deadlines, stock market updates, weather forecasts, and inspirational quotes. It uses React for the frontend and uses Node.js with the Express.js framework for the backend to efficiently manage requests and serve API endpoints. I created this app to consolidate various data sources into one view, eliminating the hassle of switching between apps.

<img width="1597" alt="dashboard" src="https://github.com/ljohr/personalDashboard/assets/46297075/e505bfb6-cb75-4428-a089-0a064302fb8c">

## See Live

Please note that I am using the free tier of Render's web service, so the server will go idle without use. Please try again after 2-3 minutes if nothing loads. https://personaldashboard-3ayp.onrender.com/

## API Endpoints

The server provides several endpoints for data retrieval:

- `/api/canvasApi`: Fetches upcoming events from the Canvas LMS REST API.
- `/api/quotableApi`: Retrieves inspirational quotes from the Quotable API.
- `/api/weatherApi`: Obtains current weather data from the Open-Meteo Weather API.
- `/api/alphaVantageApi`: Gathers stock data from the Alpha Vantage API.

## Installation

Follow these steps to set up the dashboard on your local machine:

1. Clone the repository to your local system.
2. Install the necessary dependencies:
   - For the client: `cd client` and then `npm install`
   - For the server: `cd server` and then `npm install`
3. Configure your environment variables based on the provided `.env.example` file.

## Usage

To initiate the dashboard:

- For the client: Navigate to the client directory and execute `npm run dev`
- For the server: Open a new terminal tab, navigate to the server directory, and execute `npm run dev`

## Environment Setup

Create a `.env` file in the server directory with the following variables:

- CANVAS_DOMAIN=yourcollege.instructure.com
- CANVAS_ACCESS_TOKEN=your_canvas_access_token
- ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key

A Canvas Access token can be generated in the settings section of your Canvas account page.
