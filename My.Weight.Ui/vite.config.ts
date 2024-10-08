import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': { target: 'https://localhost:7187', secure: false },
		},
	},
	build: {
		outDir: '../dist/wwwroot',
	},
});
