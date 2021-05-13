<template>
	<div class="">
		<div class="messages">
			<p clas="mb-3">Notification</p>
			<ui-input
        block
        class="my-2 w-full"
				type="text"
        label="Title"
				:model-value="activity.message.title"
				@input="updateActivity({ message: { title: $event.target.value } })"
			/>
      <ui-input
        textarea
        class="my-2 w-full"
        label="Description"
        @input="updateActivity({ message: { description: $event.target.value } })"
				:model-value="activity.message.description"
      />
		</div>
		<label class="mt-2 flex items-center">
			<ui-switch
				:model-value="activity.playSound"
				@update:model-value="updateActivity({ playSound: $event })"
			></ui-switch>
			<span class="ml-3">Play Sound</span>
		</label>
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

  	function updateActivity(data) {
  		store.commit('updateActivity', {
  			name: props.activity.name,
  			data,
  		});
  	}

  	return {
  		updateActivity,
  	};
  },
};
</script>
