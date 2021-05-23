import Input from '../components/ui/Input.vue';
import Modal from '../components/ui/Modal.vue';
import Switch from '../components/ui/Switch.vue';
import Spinner from '../components/ui/Spinner.vue';
import TransitionExpand from '../components/transition/Expand.vue';
import VTootlip from '../directives/VTootlip';
import '../assets/css/tooltip.css';

export default {
  install(app) {
    app.component('ui-input', Input);
    app.component('ui-modal', Modal);
    app.component('ui-switch', Switch);
    app.component('ui-spinner', Spinner);
    app.component('transition-expand', TransitionExpand);

    app.directive('tooltip', VTootlip);
  },
};
