import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/customer/ui',
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), viteTsconfigPaths()],
});
