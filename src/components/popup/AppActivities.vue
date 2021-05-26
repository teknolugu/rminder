<template>
  <div class="activities">
    <div class="flex items-center mb-2">
      <p class="mb-1">Reminder List</p>
      <div class="flex-1"></div>
      <a href="https://github.com/WinTenDev/rminder" target="_blank">
        <v-mdi name="mdiGithub"></v-mdi>
      </a>
    </div>
    <activity-list :data="activities" @edit="showActivityModal"></activity-list>
    <div class="mt-4">
      <div class="flex items-center mb-2">
        <p class="mb-1">My Reminder</p>
        <div class="flex-grow"></div>
        <ui-button icon v-tooltip="'Add reminder'" @click="addActivity">
          <v-mdi class="text-primary" name="mdi-plus"></v-mdi>
        </ui-button>
      </div>
      <activity-list
        @edit="showActivityModal($event, true)"
        @delete="deleteActivity"
        :data="customActivities"
        is-custom
      ></activity-list>
    </div>
    <ui-activity-modal
      @submit="updateActivity"
      v-model="modal.show"
      :data="modal.data"
      :show-name="modal.isCustom"
      title="Edit reminder"
    ></ui-activity-modal>
  </div>
</template>
<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import ActivityList from './ActivityList/index.vue';

export default {
  components: { ActivityList },
  setup() {
    const store = useStore();

    const modal = reactive({
      show: false,
      data: {},
      isCustom: false,
    });

    const activities = computed(() => store.getters.activities);
    const customActivities = computed(() => store.getters.customActivities);

    function addActivity() {
      store.dispatch('addActivity');
    }
    function deleteActivity(id) {
      store.dispatch('deleteActivity', id);
    }
    function updateActivity(data) {
      const { id } = data;

      /* eslint-disable-next-line */
      delete data.id;

      store.commit('updateActivity', {
        id,
        data,
        isCustom: modal.isCustom,
      });

      modal.show = false;
      modal.data = {};
    }
    function showActivityModal({
      id, playSound, message, name,
    }, isCustom = false) {
      modal.data = {
        name,
        message,
        playSound,
        id: isCustom ? id : name,
      };
      modal.isCustom = isCustom;
      modal.show = true;
    }

    return {
      modal,
      activities,
      addActivity,
      deleteActivity,
      updateActivity,
      customActivities,
      showActivityModal,
    };
  },
};
</script>
