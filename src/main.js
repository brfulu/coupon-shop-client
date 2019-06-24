import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import Shop from './components/Shop.vue';
import Home from './components/Home.vue';
import User from './components/User.vue';

/**
 * Ovde kreiramo root Vue instancu. Ona nam predstavlja sponu
 * izmedju html-a (public/index.html) i root Vue komponente (App.vue).
 * 
 * Vue instanci prosledjujemo konfiguracioni objekat.
 * Moguce konfiguracije mozete naci na https://vuejs.org/v2/api/#Options-Data
 * 
 * Prosledili smo komponentu koju zelimo da renderujemo nakon sto smo je importovali na liniji 2. 
 * Komponenta ce biti renderovana na mestu HTML elementa sa id-jem id='app'.
 */

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/shop', name: 'shop', component: Shop, props: true },
  { path: '/user', component: User },
  { path: '/home', name: 'home', component: Home },
  { path: '/', component: Home }
];

const router = new VueRouter({ routes });


new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
