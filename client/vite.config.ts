import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'build',
    // sourcemap: true,
  },
  test: vitestConfig.test,
  plugins: [react(), viteTsconfigPaths(), svgr()],
  // plugins: [react(), viteTsconfigPaths(), svgr({ svgrOptions: { icon: true } })],
  server: {
    open: true,
    port: 3000,
  },
});
