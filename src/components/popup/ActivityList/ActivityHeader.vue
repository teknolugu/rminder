<template>
	<div class="flex items-center">
		<div
			class="p-2 rounded-lg"
			:class="[
				activity.disabled
					? 'bg-gray-200 text-gray-600'
					: `bg-gradient-to-br text-white ${isCustom ? 'from-pink-500 to-rose-500' : activity.color}`
			]"
		>
			<v-mdi :name="isCustom ? 'mdi-alarm' : activity.icon"></v-mdi>
		</div>
		<div class="ml-3 flex-1 text-overflow pr-2">
			<p class="capitalize leading-tight font-semibold text-overflow">{{ activity.name }}</p>
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
    isCustom: Boolean,
  },
  setup(props) {
  	const store = useStore();

  	async function toggleDisable(isActive) {
  		store.commit('updateActivity', {
  			id: props.activity.id,
        isCustom: props.isCustom,
  			data: {
  				disabled: !isActive,
  				expand: false,
  			},
  		});

  		if (isActive) {
  			await browser.alarms.create(props.activity.id, {
	        periodInMinutes: props.activity.interval,
	      });
  		} else {
	  		const isAlarmExist = await browser.alarms.get(props.activity.id);

        if (isAlarmExist) await browser.alarms.clear(props.activity.id);
	  	}
  	}

  	return {
  		toggleDisable,
  	};
  },
};
</script>
