import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import 'dotenv/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: process.env.PORT,
		proxy: {
			'/api': 'http://localhost:5003',
			'/auth': 'http://localhost:5003'
		}
	}
});
