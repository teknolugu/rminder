<template>
  <ui-modal>
    <template #header>
      {{ title }}
    </template>
    <form @submit.prevent="submitData">
      <ui-input
        v-if="showName"
        v-model="state.name"
        block
        class="w-full mb-2"
        type="text"
        label="Reminder name"
      />
      <ui-input
        v-model="state.message.title"
        block
        class="w-full mb-2"
        type="text"
        label="Notification title"
      />
      <ui-input
        v-model="state.message.description"
        textarea
        class="w-full mb-2"
        label="Notification description"
      />
      <label class="flex items-center">
        <ui-switch v-model="state.playSound"></ui-switch>
        <span class="ml-3">Play notification sound</span>
      </label>
      <ui-button variant="primary" class="mt-6 w-full">
        {{ btnText }}
      </ui-button>
    </form>
  </ui-modal>
</template>
<script>
import { shallowReactive, watch } from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    btnText: {
      type: String,
      default: 'Save',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    showName: Boolean,
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const initialState = {
      id: '',
      playSound: false,
      message: {
        name: '',
        description: '',
      },
    };
    const state = shallowReactive(initialState);

    function submitData() {
      emit('submit', state);
      Object.assign(state, initialState);
    }

    watch(() => props.data, (value) => {
      Object.assign(state, value);
    }, { immediate: true });

    return {
      state,
      submitData,
    };
  },
};
</script>
