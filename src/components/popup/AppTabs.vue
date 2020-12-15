<template>
	<tabs-ui
		class="absolute shadow-xl mx-4 bg-light rounded-lg border app-tabs"
		:model-value="state.activeTab"
		@update:model-value="changeActiveTab"
		type="pills"
	>
		<template #tabs>
			<tab-ui
				v-for="activity in state.activities"
				:key="activity.name"
				:value="activity.name"
			>
				<span class="text-sm capitalize">{{ activity.name }}</span>
			</tab-ui>
		</template>
	</tabs-ui>
</template>
<script>
import { useStore } from 'vuex';

export default {
  setup() {
  	const store = useStore();

  	function changeActiveTab(value) {
  		store.commit('updateState', {
  			key: 'activeTab',
  			value,
  		});
  	}

  	return {
  		state: store.state,
  		changeActiveTab,
  	};
  },
};
</script>
<style>
.app-tabs ul {
	background-color: transparent;
}

.app-tabs li {
	box-shadow: none;
}
</style>
