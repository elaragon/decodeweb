import Vue from 'vue';
import Router from 'vue-router';
import _ from 'lodash';

import Authenticate from '../pages/Authenticate.vue';
import Home from '../pages/Home.vue';
import Devices from '../pages/Devices.vue';
import NewDevice from '../pages/NewDevice.vue';
import Device from '../pages/Device.vue';
import ChooseCommunity from '../pages/ChooseCommunity.vue';
import JoinCommunity from '../pages/JoinCommunity.vue';
import DeviceMembership from '../pages/DeviceMembership.vue';
import Onboarding from '../pages/Onboarding.vue';
import Login from '../pages/Login.vue';
import Reset from '../pages/Reset.vue';

import store from '../store';

import {
  INITIALIZE_CONFIG,
  CLEAR_ERROR,
  SAVE_PREVIOUS_TO,
  RESET
} from '../store/mutation-types';

Vue.use(Router);

store.commit(INITIALIZE_CONFIG);

const router = new Router({
  routes: [
    {
      path: '/auth',
      name: 'authenticate',
      component: Authenticate,
      props: true
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/devices',
      name: 'devices',
      component: Devices,
      props: true
    },
    {
      path: '/devices/new',
      name: 'newDevice',
      component: NewDevice,
      props: true
    },
    {
      path: '/devices/:id',
      name: 'device',
      component: Device,
      props: true
    },
    {
      path: '/devices/:id/choose',
      name: 'choose',
      component: ChooseCommunity,
      props: true
    },
    {
      path: '/devices/:id/join/:attribute_id',
      name: 'join',
      component: JoinCommunity,
      props: true
    },
    {
      path: '/devices/:id/membership/:attribute_id',
      name: 'deviceMembership',
      component: DeviceMembership,
      props: true
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset,
      props: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  // ensure error cleared each time we go to a new page
  store.commit(CLEAR_ERROR);

  if (store.state.pin) {
    if (to.path === '/auth') {
      next('/');
    } else {
      next();
    }
  } else {
    if (to.path !== '/auth') {
      // capture the previous to, then go to login page
      store.commit(SAVE_PREVIOUS_TO, _.pick(to, ['name', 'params', 'query']));
      next('/auth');
    } else {
      next();
    }
  }
});

export default router;