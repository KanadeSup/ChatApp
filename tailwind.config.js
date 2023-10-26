/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            'gray-transparent': 'rgb(241 245 249 / 1)',
         }
      },
   },
   plugins: [],
}

