import { defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === "build";
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config: UserConfig = {
    define: {
      'process.env': process.env,
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    base: './',
    plugins: [react()],
    resolve: {
      alias: {
        "@app": resolve(__dirname, './src'),
        "@i18n": resolve(__dirname, './src/i18n')
      }
    }
  }
  return config;
}
)
