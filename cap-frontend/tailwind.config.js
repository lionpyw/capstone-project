/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,ts,jsx,tsx}",
  'node_modules/daisyui/dist/**/*.js',
  'node_modules/react-daisyui/dist/**/*.js',],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")
          ],
  daisyui: {
    themes: ["garden", "dark",
    "cupcake", "bumblebee", "emerald", "corporate","synthwave", "retro", "cyberpunk", "valentine",
    "halloween", "garden", "forest","aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
    "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee",
     "winter", "dim", "nord", "sunset",],
    darkTheme: "dark",
    base: true, 
    styled: true,
    utils: true, 
    rtl: false,
    prefix: "",
    logs: true,
  },
}