import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode (dev/prod)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // ======================
    // Development Server
    // ======================
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:10000',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
          ws: true,
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.error('Proxy error:', err);
            });
          }
        }
      },
      port: 5173,
      strictPort: true,
      hmr: {
        clientPort: 5173 // Required for Render's proxy
      }
    },

    // ======================
    // Preview Server (for production testing)
    // ======================
    preview: {
      port: 5173,
      strictPort: true,
      headers: {
        'Cache-Control': 'public, max-age=600'
      }
    },

    // ======================
    // Build Configuration
    // ======================
    build: {
      outDir: '../server/public',
      emptyOutDir: true,
      sourcemap: mode !== 'production',
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'vendor-react';
              }
              if (id.includes('@mui')) {
                return 'vendor-mui';
              }
              if (id.includes('axios') || id.includes('lodash')) {
                return 'vendor-essentials';
              }
              return 'vendor';
            }
          }
        }
      }
    },

    // ======================
    // Render-Specific Optimizations
    // ======================
    base: '/',
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      'process.env': {
        VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL),
        NODE_ENV: JSON.stringify(mode)
      }
    },

    // ======================
    // Experimental Optimizations
    // ======================
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` };
        }
        return { relative: true };
      }
    }
  };
});