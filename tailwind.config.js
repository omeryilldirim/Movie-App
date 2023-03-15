/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  //? kendi theme ayarlarımızı eklemek için bu kısmı ekliyoruz
  theme: {
    //! eğer tailwind'in default theme ayarları yerine kendimizinkini eklemek istemiyorsak mutlaka extend objesi içinde eklememiz gerekli yoksa tüm theme objesi değişir ve kendi eklediklerimiz dışındakileri kullanamayız.
    extend: {
      colors: {
        "gray-dark-main": "#707686",
        "gray-dark-second": "#627C87",
        "gray-light": "#d3dce6",
        "red-main": "#86041A",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
  darkMode: 'class'
};
