import { createApp } from 'vue';
import App from './App.vue';
import store from '../store';
import compsUi from '../lib/compsUi';
import '../assets/css/tailwind.css';

const app = createApp(App);

app
  .use(compsUi)
  .use(store)
  .mount('#app');
