// :::::::::: TailwindCSS Config ::::::::::
// Defines a configuration for loading in TailwindCSS

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}" // file formats to target
  ],
  theme: {
    extend: {
      height: {
        'screen-dynamic': '100dvh'
      }
    },
  },
  plugins: [],
}