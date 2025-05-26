# Weather Application

This is a full-stack weather application built with Angular (frontend) and Node.js (backend) that provides comprehensive weather information and location-based services.

## Overview

The application offers a rich set of features for weather monitoring and location management:

### Key Features
- **Location Search**: Users can search for any location worldwide
- **Auto-Detection**: Automatically detects user's current location for instant weather updates
- **Detailed Weather Information**: Comprehensive weather data including:
  - Current conditions
  - Temperature details
  - Weather forecasts
- **Interactive Temperature Chart**: Meteogram displaying temperature trends and forecasts
- **Favorites System**: Users can save their favorite locations for quick access
- **Weather Maps**: Interactive maps showing weather patterns for saved locations
- **Social Media Integration**: Share weather information directly to social media platforms

## Project Structure

```
.
├── frontend/           # Angular frontend application
│   ├── app/           # Angular components and modules
│   ├── server.ts      # Server-side rendering setup
│   ├── main.ts        # Main application entry point
│   └── package.json   # Frontend dependencies
│
└── backend/           # Node.js backend application
    ├── server.js      # Backend server implementation
    └── package.json   # Backend dependencies
```

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)
- Angular CLI
- API Keys Required:
  - Google Maps API key (for geocoding and maps)
  - Weather API key (for weather data)

## Environment Setup

Before running the application, you need to set up your API keys:

1. Create a `.env` file in the backend directory:
   ```bash
   cd backend
   touch .env
   ```

2. Add your API keys to the `.env` file:
   ```
   GOOGLE_MAPS_API_KEY=your_google_maps_key
   WEATHER_API_KEY=your_weather_api_key
   ```

3. For the frontend, create an `environment.ts` file in the `frontend/src/environments` directory with your API keys:
   ```typescript
   export const environment = {
     production: false,
     googleMapsApiKey: 'your_google_maps_key',
     weatherApiKey: 'your_weather_api_key'
   };
   ```

Note: Never commit your actual API keys to version control. Make sure `.env` and `environment.ts` files are listed in your `.gitignore`.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

The backend server will start running on the configured port.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

The application will be available at `http://localhost:4200` by default.

## Development

- Frontend development server supports hot-reloading
- Backend API endpoints can be tested using tools like Postman or cURL
- The project uses TypeScript for better type safety and developer experience

## Deployment

### Frontend Deployment

The frontend includes an `app.yaml` file for Google Cloud Platform deployment. You can deploy using:

```bash
gcloud app deploy
```

### Backend Deployment

The backend can be deployed to your preferred hosting platform (e.g., Google Cloud Platform, Heroku, AWS).

## Additional Information

- The frontend is built with Angular, providing a modern and responsive user interface
- The backend uses Node.js for handling API requests and business logic
- TypeScript is used throughout the project for enhanced development experience

## License

This project is licensed under the MIT License - see the LICENSE file for details 