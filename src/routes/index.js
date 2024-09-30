import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Book from '~/pages/Book';
import LightNovel from '~/pages/LightNovel';
import Read from '~/pages/Read';
import Login from '~/pages/Login';
import CreatePin from '~/pages/CreatePin';
import Admin from '~/pages/Admin';
import Test from '~/pages/Test';
import Follow from '~/pages/Follow';
import Mark from '~/pages/Mark';
import History from '~/pages/History';
import Uploaded from '~/pages/Uploaded';
import Donate from '~/pages/Donate';

import { AdminLayout } from '~/components/Layout/';
const publicRoutes = [
  { path: '/test', component: Test },
  { path: '/test/test', component: Test },
  { path: '/test/order/vnpay_return', component: Test },
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/bookmark', component: Mark },
  { path: '/history', component: History },
  { path: '/follow', component: Follow },
  { path: '/uploaded', component: Uploaded },
  { path: '/donate', component: Donate },
  { path: '/search', component: Search },
  { path: '/search/:category', component: Search },
  { path: '/book/:ID', component: Book },
  {
    path: '/read/:ID/chapter/:ChapterID',
    component: Read,
    // layout: null,
  },
  { path: '/read/:ID', component: LightNovel },
  { path: '/login', component: Login, layout: null },
  { path: '/pin-creation-tool', component: CreatePin, layout: null },
  { path: '/admin', component: Admin, layout: AdminLayout },
  { path: '/admin/:page', component: Admin, layout: AdminLayout },
  { path: '/admin/:page/:slug', component: Admin, layout: AdminLayout },
  // {
  //   path: '/admin/user',
  //   component: Admin,
  //   layout: AdminLayout,
  //   page: 'user',
  // },
  // {
  //   path: '/admin/user/json',
  //   component: Admin,
  //   layout: null,
  //   page: 'user',
  // },
  // {
  //   path: '/admin/:id/:slug',
  //   component: Admin,
  //   layout: AdminLayout,
  //   page: ':id/:slug',
  // },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
