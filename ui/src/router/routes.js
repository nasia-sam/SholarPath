import { isAdmin } from './middlewares/auth'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    props: true,
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        redirect: to => { return { path: '/courses' } }
      },
      { path: '/courses', component: () => import('pages/ProgramCourses.vue') },
      { path: '/courses/:slug', component: () => import('pages/ShowCourseProgram.vue') },
      {
        path: '/courses/:slug/candidates',
        component: () => import('pages/Candidates.vue')
        // beforeEnter: [isLogged]
      },
      { path: '/reference/:token', component: () => import('pages/Reference.vue') },
      {
        path: '/reference/info',
        name: 'referenceInfo',
        component: () => import('pages/static-content/ReferenceInfo.vue')
      },
      { path: '/register/:token', component: () => import('pages/Registration.vue') },
      { path: '/submission/success', component: () => import('pages/static-content/SuccessfullSubmission.vue') },
      {
        path: '/users',
        component: () => import('pages/InvitedUsers.vue'),
        beforeEnter: [isAdmin]
      }
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
