<template>
  <div class="app">
    <template v-if="isRetrieved">
    	<div class="bg-light rounded-b-2xl p-4">
    		<app-activities-card></app-activities-card>
    	</div>
    	<div class="content p-4">
        <p class="mb-1">Reminder List</p>
    	  <app-activities></app-activities>
      </div>
      <div class="p-4 text-sm">
        Icons on notification by
        <a
          href="https://icons8.com/"
          title="Icons8"
          class="text-primary"
          target="_blank"
        >Icons8.com</a>
        <p>
          Notification sound provide by
          <a
            href="https://notificationsounds.com/"
            class="text-primary"
            target="_blank"
          >Notification Sounds</a>
        </p>
      </div>
    </template>
    <spinner-ui class="mx-auto my-6" v-else></spinner-ui>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AppActivitiesCard from '@/components/popup/AppActivitiesCard.vue';
import AppActivities from '@/components/popup/AppActivities/Index.vue';

export default {
  name: 'App',
  components: { AppActivitiesCard, AppActivities },
  setup() {
  	const store = useStore();
    const isRetrieved = ref(false);

  	onMounted(async () => {
  		await store.dispatch('retrieve');
      isRetrieved.value = true;
  	});

  	return {
      isRetrieved,
  	};
  },
};
</script>

<style>
html {
	font-family: "Inter", sans-serif !important;
  width: 340px;
  height: 500px;
}
</style>
