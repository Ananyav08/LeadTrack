// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   build: {
//     sourcemap: false,
//   },
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   server: {
//     proxy: {
//       '/api': 'http://localhost:8000',
//     },
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: { sourcemap: false },
  plugins: [react()],   // only React plugin – no tailwindcss()
  server: {
    proxy: { '/api': 'http://localhost:8000' },
  },
})