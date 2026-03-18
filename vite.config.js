import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'Ford-Vehicle-Lines-At-a-Glance';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${repoName}/` : '/',
}));
