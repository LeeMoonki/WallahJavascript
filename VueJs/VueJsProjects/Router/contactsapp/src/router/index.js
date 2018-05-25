import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue';
import About from '../components/About.vue';
import ContactList from '../components/ContactList.vue';
import ContactForm from '../components/ContactForm.vue';
import UpdatePhoto from '../components/UpdatePhoto.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/contacts', name: 'contacts', component: ContactList, children: [
        { path: 'add', name: 'addcontact', component: ContactForm },
        { path: 'update/:no', name: 'updatecontact', component: ContactForm, props: true },
        { path: 'photo/:no', name: 'updatephoto', component: UpdatePhoto, props: true }
      ] 
    },
    { path: '*', component: NotFound }
  ]
});
