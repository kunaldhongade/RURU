import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173, // Optional: Specify a custom port
    strictPort: true,
    cors: true, // Enable CORS if needed
  }
  
})
