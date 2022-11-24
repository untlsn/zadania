module.exports = {
  purge: false,
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      colors: {
        lime: '#00b289',
        text: '#4c4d5f',
        yellow: '#f8db62',
        // Query devtools colors
        qd: {
          active: '#E8A801',
          inactive: '#3B4858',
          fetching: '#006BFF',
          primary: '#030E1B',
          secondary: '#142337',
          data: '#FF0185',
        }
      },
    },
  },
  plugins: [],
};
