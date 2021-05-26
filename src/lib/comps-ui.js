import Input from '../components/ui/Input.vue';
import Modal from '../components/ui/Modal.vue';
import Switch from '../components/ui/Switch.vue';
import Button from '../components/ui/Button.vue';
import Spinner from '../components/ui/Spinner.vue';
import ActivityModal from '../components/ui/ActivityModal.vue';
import TransitionExpand from '../components/transition/Expand.vue';
import TransitionGroupList from '../components/transition/GroupList.vue';
import VTootlip from '../directives/VTootlip';
import '../assets/css/tooltip.css';

export default {
  install(app) {
    app.component('ui-input', Input);
    app.component('ui-modal', Modal);
    app.component('ui-switch', Switch);
    app.component('ui-button', Button);
    app.component('ui-spinner', Spinner);
    app.component('ui-activity-modal', ActivityModal);

    app.component('transition-expand', TransitionExpand);
    app.component('transition-group-list', TransitionGroupList);

    app.directive('tooltip', VTootlip);
  },
};
