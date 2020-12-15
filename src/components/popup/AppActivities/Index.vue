<template>
	<div class="activities divide-y">
		<div
			v-for="activity in activities"
			:key="activity.name"
			class="py-1"
		>
			<div
				class="activity p-3 rounded-lg transition"
				:class="[activity.expand ? 'bg-input' : 'hover:bg-input']"
			>
				<activity-header v-bind="{ activity }"></activity-header>
				<expand-transition>
					<div class="flex items-center mt-3" v-if="!activity.disabled">
						<activity-slider v-bind="{ activity }"></activity-slider>
						<icon-ui
							name="mdiCog"
							v-tooltip:bottom="'Settings'"
							class="cursor-pointer"
							:class="[activity.expand ? 'text-primary' : 'text-lighter']"
							@click="updateActivity(activity.name, { expand: !activity.expand })"
						></icon-ui>
					</div>
				</expand-transition>
				<expand-transition>
					<activity-settings
						class="settings mt-2 pt-2 border-t" v-if="activity.expand && !activity.disabled"
						v-bind="{ activity }"
					></activity-settings>
				</expand-transition>
			</div>
		</div>
	</div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ActivityHeader from './ActivityHeader.vue';
import ActivitySlider from './ActivitySlider.vue';
import ActivitySettings from './ActivitySettings.vue';

export default {
  components: { ActivityHeader, ActivitySlider, ActivitySettings },
  setup() {
  	const store = useStore();

  	const activities = computed(() => store.getters.activities);

  	function updateActivity(name, data = {}) {
  		store.commit('updateActivity', { name, data });
  	}

  	return {
  		activities,
  		updateActivity,
  	};
  },
};
</script>
