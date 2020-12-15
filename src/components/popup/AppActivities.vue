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
				<div class="flex items-center">
					<div
						class="p-2 rounded-lg"
						:class="[
							activity.disabled
								? 'bg-input text-lighter'
								: `bg-gradient-to-br text-white ${activity.color}`
						]"
					>
						<icon-ui :name="activity.icon"></icon-ui>
					</div>
					<div class="ml-3 flex-1">
						<p class="capitalize leading-tight font-semibold">{{ activity.name }}</p>
						<p class="text-gray-600 leading-tight">
							{{ activity.disabled ? 'Disabled' : `${activity.interval} Minutes` }}
						</p>
					</div>
					<switch-ui
						:model-value="!activity.disabled"
						@update:model-value="updateActivity(activity.name, { disabled: !$event });"
					></switch-ui>
				</div>
				<expand-transition>
					<div class="flex items-center mt-3" v-if="!activity.disabled">
						<vue-slider
							tooltip-placement="bottom"
							class="flex-1 mr-3 ml-2"
							:tooltip-formatter="sliderFormatter"
							:interval="5"
							model-value="5"
							:max="120"
							:min="5"
						></vue-slider>
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
					<div class="settings mt-2 pt-2 border-t" v-if="activity.expand && !activity.disabled">
						<input-ui></input-ui>
					</div>
				</expand-transition>
			</div>
		</div>
		{{ times }}
	</div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  components: { VueSlider },
  setup() {
  	const store = useStore();

  	const activities = computed(() => store.getters.activities);

  	function updateActivity(name, data = {}) {
  		store.commit('updateActivity', { name, data });
  	}

  	return {
  		activities,
  		updateActivity,
  		sliderFormatter: (value) => `${value} minutes`,
  	};
  },
};
</script>
