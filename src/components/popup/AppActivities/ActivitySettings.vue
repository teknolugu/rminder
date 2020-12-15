<template>
	<div class="">
		<div class="messages">
			<p clas="mb-3">Notification</p>
			<label class="my-2 block">
				<span class="text-sm block">Title</span>
				<input
					type="text"
					placeholder="Title"
					class="bg-input p-2 w-full rounded-lg focus:bg-input-dark hover:bg-input-dark transition"
					:value="activity.message.title"
					@change="updateActivity({ message: { title: $event.target.value } })"
				/>
			</label>
			<label>
				<span class="text-sm block">Description</span>
				<textarea
					placeholder="description"
					class="bg-input p-2 w-full rounded-lg focus:bg-input-dark hover:bg-input-dark transition h-24 resize-none"
					:value="activity.message.description"
					@change="updateActivity({ message: { description: $event.target.value } })"
				></textarea>
			</label>
		</div>
		<label class="mt-2 flex items-center">
			<switch-ui
				:model-value="activity.playSound"
				@update:model-value="updateActivity({ playSound: $event })"
			></switch-ui>
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
