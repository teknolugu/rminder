<template>
  <div class="app">
    <template v-if="isRetrieved">
    	<div class="rounded-b-2xl p-4 bg-gray-100">
    		<app-activities-card></app-activities-card>
    	</div>
    	<div class="content p-4">
    	  <app-activities></app-activities>
      </div>
      <div class="p-4 text-sm">
        Icons on notification by
        <a
          href="https://icons8.com/"
          title="Icons8"
          class="text-primary"
          target="_blank"
        >
          Icons8.com
        </a>
      </div>
    </template>
    <div class="text-center py-12" v-else>
      <ui-spinner size="36"></ui-spinner>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import AppActivitiesCard from '@/components/popup/AppActivitiesCard.vue';
import AppActivities from '@/components/popup/AppActivities.vue';

export default {
  name: 'App',
  components: { AppActivitiesCard, AppActivities },
  setup() {
  	const store = useStore();
    const isRetrieved = ref(false);

    store.dispatch('retrieve').then(() => {
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
  width: 340px;
  height: 600px;
}
</style>
