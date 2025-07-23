// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'fade-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
      animation: {
        up: 'fade-up 0.3s ease',
        down: 'fade-down 0.3s ease'
      }
    }
  }
}
