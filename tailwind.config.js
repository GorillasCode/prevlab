module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // ALTEREI A ALTURA MAXIMA PRA PODER COLOCAR 32rem 
      height: {
        '128': '32rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
