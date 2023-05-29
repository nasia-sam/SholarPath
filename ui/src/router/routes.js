
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/courses', component: () => import('pages/ProgramCourses.vue') },
      { path: '/courses/:slug', component: () => import('pages/ShowCourseProgram.vue') },
      { path: '/courses/:slug/candidates', component: () => import('pages/Candidates.vue') },
      { path: '/reference/:token', component: () => import('pages/Reference.vue') },
      { path: '/register/:token', component: () => import('pages/Registration.vue') },
      { path: '/users', component: () => import('pages/InvitedUsers.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
