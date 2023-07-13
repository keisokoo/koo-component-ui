import rollupPluginBabel from '@rollup/plugin-babel'
import react from '@vitejs/plugin-react'
import { ViteDevServer, defineConfig } from 'vite'
import macrosPlugin from 'vite-plugin-babel-macros'
import { updateVariablesScss } from './src/scripts/syncStyles'

const styleUpdatePlugin = () => ({
  name: 'configure-update-plugin',
  configureServer(server: ViteDevServer) {
    server.watcher.on('change', async (filePath) => {
      if (filePath.includes('src/configs/themes.ts')) {
        await updateVariablesScss()
        server.ws.send({ type: 'full-reload' })
      }
    })
  },
})
export default defineConfig({
  plugins: [styleUpdatePlugin(), react(), macrosPlugin()],
  build: {
    rollupOptions: {
      plugins: [
        rollupPluginBabel({
          babelHelpers: 'bundled',
        }),
      ],
    },
  },
})
