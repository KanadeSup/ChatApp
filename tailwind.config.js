/** @type {import('tailwindcss').Config} */
export default {
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
     extend: {
       colors: {
         'super-red':'#5678as',
         'bold-blue': 'rgb(18,100,163)'
       },
       borderWidth: {
         DEFAULT: '1px',
         '0': '0',
         '2': '2px',
         '4': '4px',
         '6': '6px',
         '8': '8px',
       },
       height: {
         '128': '32rem',
         '3/5': '60%',
       }
     },
   },
   plugins: [],
 }
 
 