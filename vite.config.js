import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    proxy: {
			"/auth": {
				target: "https://api.teamsphere.co/",
			},
			"/api": {
				target: "https://api.teamsphere.co/",
			},
		},

  }
})
