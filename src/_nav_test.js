export default [
  {
    component: 'CNavItem',
    name: '메인 대시보드',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'Main',
    },
  },
  {
    component: 'CNavGroup',
    name: '주식',
    to: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: '게시글 목록 보기',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: '게시글 검색하기',
        to: '/base/breadcrumbs',
      }
    ],
  },
  {
    component: 'CNavTitle',
    name: '테스트 페이지',
  },
  {
    component: 'CNavGroup',
    name: 'Pages',
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/default/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/default/500',
      },
    ],
  },
]
