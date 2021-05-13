<template>
	<div class="flex items-center">
		<div
			class="p-2 rounded-lg"
			:class="[
				activity.disabled
					? 'bg-gray-100 text-lighter'
					: `bg-gradient-to-br text-white ${activity.color}`
			]"
		>
			<v-mdi :name="activity.icon"></v-mdi>
		</div>
		<div class="ml-3 flex-1">
			<p class="capitalize leading-tight font-semibold">{{ activity.name }}</p>
			<p class="text-gray-600 leading-tight">
				{{ activity.disabled ? 'Disabled' : `${activity.interval} Minutes` }}
			</p>
		</div>
		<ui-switch
			:model-value="!activity.disabled"
			@update:model-value="toggleDisable"
		></ui-switch>
	</div>
</template>
<script>
import { useStore } from 'vuex';

export default {
  props: {
  	activity: {
  		type: Object,
  		default: () => ({}),
  	},
  },
  setup(props) {
  	const store = useStore();

  	async function toggleDisable(isActive) {
  		store.commit('updateActivity', {
  			name: props.activity.name,
  			data: {
  				disabled: !isActive,
  				expand: false,
  			},
  		});

  		if (isActive) {
  			await browser.alarms.create(props.activity.name, {
	        periodInMinutes: props.activity.interval,
	      });
  		} else {
	  		const isAlarmExist = await browser.alarms.get(props.activity.name);

        if (isAlarmExist) await browser.alarms.clear(props.activity.name);
	  	}
  	}

  	return {
  		toggleDisable,
  	};
  },
};
</script>
