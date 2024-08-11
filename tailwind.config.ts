import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'button-blue': '#007BFF',
        'button-blue-hover': '#0056b3',
        'button-gray': '#6C757D',
        'button-gray-hover': '#5a6268',
        'button-green': '#28A745',
        'button-green-hover': '#218838',
        'pagination': '#bfdbfe',
        'pagination-hover': '#3b82f6',
        'dropdown-hover': '#bfdbfe',
        'pending-status': '#FFA500',
        'accepted-status': '#28A745',
        'resolved-status': '#17A2B8',
        'rejected-status': '#DC3545',
      }
    },
  },
  plugins: [],
};
export default config;
