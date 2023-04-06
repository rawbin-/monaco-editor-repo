import { defineConfig } from 'umi';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { NODE_ENV } = process.env;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  copy: [
    {
      from: 'node_modules/monaco-editor/min/vs/',
      to: 'monaco-editor/min/vs/',
    },
  ],
  routes: [
    {
      path: '/',
      component: '@/pages/index',
    },
    {
      path: '/EditorA',
      component: '@/pages/EditorA',
    },
    {
      path: '/EditorB',
      component: '@/pages/EditorB',
    },
  ],
  fastRefresh: {},
  define: {
    'process.env.NODE_ENV': NODE_ENV,
  },
});
