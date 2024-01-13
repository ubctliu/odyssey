/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        aboutParallax: 'url("../../public/images/plane1.png")',
      },
      keyframes: {
        zoomInOut: {
          '0': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)'},
          '75%': { transform: 'scale(1.7)'},
          '90%': { transform: 'scale(1.9)'},
          '100%': { transform: 'scale(1)'},
         },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        zoomInOut: 'zoomInOut 12s infinite',
        "fade-in": "fadeIn 1s ease-in forwards",
        slideIn: "slideIn 2s ease-in-out",
      },
    },
  }
