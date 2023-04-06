import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
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
});
