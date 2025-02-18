# 🌦 Weather App

A simple and modern weather application that allows users to **search for weather conditions in any city** and also **fetches the current location's weather** automatically. The app provides **temperature, humidity, wind speed, precipitation (rain/snow), sunrise, and sunset times**, with proper timezone adjustments.  

The interface is **clean, user-friendly, and responsive**, designed using **Tailwind CSS**. The app also includes **hover effects, click-to-expand weather details, and a refresh button** for an enhanced user experience.  

The weather app is live at: https://weather-app-git-main-gunashree-channakeshavas-projects.vercel.app

---

## 🚀 Features

- **Search for weather in any city**  
- **Fetches current location’s weather automatically**  
- **Displays temperature, humidity, and wind speed**  
- **Shows precipitation (rain/snow) if available**  
- **Sunrise & Sunset times adjusted based on timezone**  
- **Hover and click-to-expand weather details for current location**  
- **Refresh button to reload the app easily**  
- **Modern and responsive UI using Tailwind CSS**  
- **Geolocation API for detecting user’s location**  

---

## 🛠️ Technologies Used

- **React.js** - Frontend framework  
- **Axios** - For making API requests  
- **OpenWeatherMap API** - Fetching weather data  
- **Geolocation API** - Fetching user’s current location  
- **Tailwind CSS** - Styling the UI  
- **Vite** - Fast frontend build tool for React  

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

To get started, **clone** this repository to your local machine using:

```sh
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2️⃣ Install Dependencies
```sh
npm install
npm install react react-dom react-router-dom axios tailwindcss postcss autoprefixer
```
Initialize Tailwind CSS (if not already set up)
```sh
npx tailwindcss init -p
```

### 3️⃣ Create an .env File
```sh
Create a .env file in the project root and add your OpenWeatherMap API key:
VITE_WEATHER_API_KEY=your_api_key_here
```

### 4️⃣ Run the App Locally
```sh
npm run dev
```
This will start the React app at http://localhost:5173/.
