# Nexus Dashboard: Phase 2 - Real-time Weather Widget

Welcome to the **Nexus Dashboard**, a premium, state-of-the-art productivity and analytics suite. This project is part of the Daily Dev Challenges, focused on creating high-performance, visually stunning web applications.

## 🎯 Phase 2 Objectives
The primary focus of Phase 2 is real-time data integration:
- **Weather API Integration**: Fetching live weather data using the Open-Meteo API.
- **Dynamic Weather UI**: Displaying temperature, humidity, wind speed, and conditions with adaptive Lucide icons.
- **Automatic Refresh**: Implementing an auto-refresh mechanism (every 10 minutes) to keep data current without page reloads.

## ✨ Features Implemented
- **Dynamic Theme Switching**: Seamless transitions between 5 distinct themes using a unified CSS variable engine.
- **Glassmorphic UI**: High-end visual effects using backdrop filters, subtle gradients, and glowing borders.
- **Responsive Grid**: A fluid dashboard layout that adapts perfectly from mobile to ultra-wide displays.
- **Performance Optimized**: Lazy loading of non-critical components to ensure rapid initial load times.
- **PWA Ready**: Service worker integration for offline capabilities and app-like experience.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Joyal01-01/Daily-Dev-Challenges.git

# Navigate to the project directory
cd projects/nexus-dashboard/day-1/Joyal-Poudel

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📂 Project Structure
```text
src/
├── components/      # UI components (Sidebar, MetricCards, Widgets)
├── context/         # Theme state management
├── styles/          # Global styles and design system tokens
├── hooks/           # Custom React hooks
└── utils/           # Helper functions
```

## 🛠 Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Vanilla CSS with Modern CSS Variables
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin

---
*Created with ❤️ by Joyal Poudel as part of the Nexus Dashboard Challenge.*
