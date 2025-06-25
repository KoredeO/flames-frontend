# FLAMES Calculator Frontend

A modern web application that calculates the relationship between two people using the classic FLAMES game (Friends, Lovers, Affectionate, Marriage, Enemies, Sisters).

## Features

- 🎯 Calculate FLAMES relationship between two names
- 💾 Save calculation history
- 🔄 View previous calculations
- 📱 Responsive design for all devices
- 🌟 Beautiful animations and confetti for romantic results
- 📤 Share results with friends via URL

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd flames-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add:
```env
VITE_API_BASE_URL=<your-api-base-url>
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Sharing Results

The application supports sharing FLAMES results via unique URLs. When a result is shared:
- A unique URL is generated containing the result ID
- Recipients can view the shared result by opening the URL
- Results can be shared via:
  - Native share dialog (on supported devices)
  - Copy to clipboard (fallback)

## API Integration

The frontend integrates with a FLAMES API that provides:
- Calculation of FLAMES results
- Result history management
- Individual result retrieval by ID
- Session-based user tracking

## Technologies Used

- React
- TypeScript
- Vite
- Framer Motion (for animations)
- Modern CSS (with flexbox/grid)

## Contributing

Feel free to submit issues and enhancement requests!
