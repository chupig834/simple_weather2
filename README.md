# Weather App Advanced

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

## Live Demo

- Visit the live site at [Online Demo](https://assig3chu.wl.r.appspot.com/)  

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