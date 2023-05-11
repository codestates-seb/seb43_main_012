import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), viteTsconfigPaths(), svgr()],

  // plugins: [react(), viteTsconfigPaths(), svgrPlugin({ svgrOptions: { icon: true } })],
  server: {
    open: true,
    port: 3000,
  },
});
