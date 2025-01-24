module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'], 
      },
    },
    screens:{
      'one':'100px',
      'two':'200px',
      'three':'300px',
      'four':'400px',
      'five':'500px',
      'six':'600px',
      'seven':'700px',
      'eight':'800px',
      'nine':'900px',
      'lg': '1000px',   
      'xl': '1280px',   
      '2xl': '1536px',  

    },


  },
  plugins: [],
}

