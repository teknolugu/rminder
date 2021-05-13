import { createApp } from 'vue';
import App from './App.vue';
import store from '../store';
import vueMdijs from '../lib/vue-mdijs';
import compsUi from '../lib/comps-ui';
import '../assets/css/tailwind.css';
import '../assets/css/fonts.css';

const app = createApp(App);

app
  .use(vueMdijs)
  .use(compsUi)
  .use(store)
  .mount('#app');
